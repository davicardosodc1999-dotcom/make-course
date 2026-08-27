$ROOT="C:\maquiagem"
$ART="$ROOT\articles"
$articles=Get-ChildItem $ART -Filter "*.html" -File
$allHtml=Get-ChildItem $ROOT -Filter "*.html" -File -Recurse
$search="$ROOT\js\search.js"

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "       AUDITORIA GERAL - BELEZA EM FOCO" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

Write-Host "`n[1] ARTIGOS" -ForegroundColor Yellow
Write-Host "TOTAL:" $articles.Count

$ok=0
$erro=0

foreach($f in $articles){
    $h=Get-Content $f.FullName -Raw -Encoding UTF8
    $m=[regex]::Match($h,'<article class="article-content-full">(.*?)</article>','Singleline')

    if($m.Success){
        $t=[regex]::Replace($m.Groups[1].Value,'<[^>]+>',' ')
        $t=[System.Net.WebUtility]::HtmlDecode($t)
        $w=([regex]::Matches($t,'\b[\p{L}\p{N}]+\b')).Count
    }else{$w=0}

    $img=([regex]::Matches($h,'IMAGEM DE CAPA|IMAGEM 0[123]')).Count
    $ads=([regex]::Matches($h,'class="ad-placeholder"')).Count
    $faq=([regex]::Matches($h,'class="article-faq-item"')).Count
    $h1=[regex]::IsMatch($h,'<h1[^>]*>.+?</h1>','Singleline')
    $title=[regex]::IsMatch($h,'<title>.+?</title>','Singleline')
    $meta=[regex]::IsMatch($h,'<meta\s+name=["'']description["'']','IgnoreCase')

    if($w -ge 2000 -and $img -eq 4 -and $ads -eq 4 -and $faq -eq 4 -and $h1 -and $title -and $meta){
        $ok++
    }else{
        $erro++
        Write-Host "ERRO: $($f.Name) | palavras=$w imagens=$img ads=$ads faq=$faq H1=$h1 title=$title meta=$meta" -ForegroundColor Red
    }
}

Write-Host "ARTIGOS 100% PADRAO:" $ok -ForegroundColor Green
Write-Host "ARTIGOS COM PENDENCIA:" $erro

Write-Host "`n[2] BASE DE BUSCA" -ForegroundColor Yellow
if(Test-Path $search){
    $s=Get-Content $search -Raw -Encoding UTF8
    $base=[regex]::Matches($s,'"url"\s*:\s*"articles/([^"]+\.html)"') | ForEach-Object {$_.Groups[1].Value}
    Write-Host "CADASTRADOS:" $base.Count
    $fora=$articles | Where-Object {$base -notcontains $_.Name}
    Write-Host "FORA DA BUSCA:" $fora.Count
    $fora | ForEach-Object {Write-Host $_.Name -ForegroundColor Red}
}else{
    Write-Host "SEARCH.JS AUSENTE" -ForegroundColor Red
}

Write-Host "`n[3] LINKS INTERNOS" -ForegroundColor Yellow
$broken=0
foreach($f in $allHtml){
    $h=Get-Content $f.FullName -Raw -Encoding UTF8
    foreach($m in [regex]::Matches($h,'href=["'']([^"'']+)["'']')){
        $x=$m.Groups[1].Value
        if($x -match '^(https?:|mailto:|tel:|#|javascript:)' -or !$x){continue}
        $x=($x -split '[?#]')[0]
        if(!$x){continue}
        try{
            $dest=[IO.Path]::GetFullPath((Join-Path $f.DirectoryName $x))
            if(!(Test-Path $dest)){
                $broken++
                Write-Host "QUEBRADO: $($f.Name) -> $x" -ForegroundColor Red
            }
        }catch{}
    }
}
Write-Host "TOTAL QUEBRADOS:" $broken

Write-Host "`n[4] PAGINAS IMPORTANTES" -ForegroundColor Yellow
@("index.html","artigos.html","categorias.html","buscar.html","contact.html","cookies.html","editorial-policy.html","terms.html","robots.txt","sitemap.xml") | ForEach-Object {
    if(Test-Path "$ROOT\$_"){
        Write-Host "OK  $_" -ForegroundColor Green
    }else{
        Write-Host "FALTA  $_" -ForegroundColor Red
    }
}

Write-Host "`n[5] SEO" -ForegroundColor Yellow
if(Test-Path "$ROOT\sitemap.xml"){
    $sm=Get-Content "$ROOT\sitemap.xml" -Raw -Encoding UTF8
    Write-Host "URLS SITEMAP:" ([regex]::Matches($sm,'<loc>')).Count
}

Write-Host "`n[6] IMAGENS REAIS" -ForegroundColor Yellow
$imgs=Get-ChildItem $ROOT -File -Recurse | Where-Object {$_.Extension -match '^\.(webp|jpg|jpeg|png)$'}
Write-Host "TOTAL:" $imgs.Count

Write-Host "`n==============================================" -ForegroundColor Cyan
Write-Host "RESUMO" -ForegroundColor Cyan
Write-Host "ARTIGOS:" $articles.Count
Write-Host "PADRAO OK:" $ok
Write-Host "COM PENDENCIA:" $erro
if(Test-Path $search){Write-Host "NA BUSCA:" $base.Count}
Write-Host "LINKS QUEBRADOS:" $broken
Write-Host "IMAGENS REAIS:" $imgs.Count
Write-Host "==============================================" -ForegroundColor Cyan
