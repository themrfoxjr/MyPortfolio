# Cleanup duplicate files in images folder
$imagesPath = "images"

# Remove PNG files
Get-ChildItem -Path $imagesPath -Include "*.png" | Remove-Item -Force

# Remove duplicate JPG files for JPEG files
Get-ChildItem -Path $imagesPath -File | Where-Object { $_.Extension -eq ".jpeg" } | ForEach-Object {
    $jpgFile = Join-Path $imagesPath ($_.BaseName + ".jpg")
    if (Test-Path $jpgFile) {
        Write-Host "Removing duplicate: $jpgFile"
        Remove-Item $jpgFile -Force
    }
}

Write-Host "Cleanup completed!" -ForegroundColor Green
