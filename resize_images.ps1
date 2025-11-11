# PowerShell script to resize images to 1080p at 80% quality
# If image is smaller than 1080p, it will be copied instead

$sourceFolder = "large_images"
$destFolder = "images"
$targetWidth = 1920
$targetHeight = 1080
$quality = 80

# Check if ImageMagick is available
try {
    $magickTest = Get-Command magick -ErrorAction Stop
    Write-Host "ImageMagick found: $($magickTest.Source)" -ForegroundColor Green
} catch {
    Write-Host "Error: ImageMagick not found. Please ensure it's installed and in your PATH." -ForegroundColor Red
    exit 1
}

# Get all image files
$imageFiles = Get-ChildItem -Path $sourceFolder -Include "*.jpg", "*.jpeg", "*.png", "*.bmp", "*.tiff" -File
if ($imageFiles.Count -eq 0) {
    # Try alternative approach
    $imageFiles = Get-ChildItem -Path $sourceFolder | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|bmp|tiff)$' }
}

if ($imageFiles.Count -eq 0) {
    Write-Host "No image files found in $sourceFolder" -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $($imageFiles.Count) image files to process..." -ForegroundColor Cyan

foreach ($image in $imageFiles) {
    $sourcePath = $image.FullName
    $destPath = Join-Path $destFolder $image.Name
    
    Write-Host "Processing: $($image.Name)" -ForegroundColor White
    
    # Get image dimensions using ImageMagick
    $dimensions = & magick identify -format "%wx%h" $sourcePath 2>$null
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Error reading image dimensions, copying file instead" -ForegroundColor Yellow
        Copy-Item $sourcePath $destPath
        continue
    }
    
    $width = [int]($dimensions -split 'x')[0]
    $height = [int]($dimensions -split 'x')[1]
    
    Write-Host "  Original dimensions: ${width}x${height}" -ForegroundColor Gray
    
    # Check if image is smaller than 1080p
    if ($width -le $targetWidth -and $height -le $targetHeight) {
        Write-Host "  Image is smaller than 1080p, copying file" -ForegroundColor Green
        Copy-Item $sourcePath $destPath
    } else {
        Write-Host "  Resizing to 1080p at ${quality}% quality" -ForegroundColor Yellow
        
        # Resize image maintaining aspect ratio, set quality to 80%
        & magick $sourcePath -resize "${targetWidth}x${targetHeight}>" -quality $quality $destPath
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  Successfully resized and saved to $destPath" -ForegroundColor Green
        } else {
            Write-Host "  Error resizing image, copying file instead" -ForegroundColor Red
            Copy-Item $sourcePath $destPath
        }
    }
}

Write-Host "`nImage processing completed!" -ForegroundColor Cyan
Write-Host "Processed $($imageFiles.Count) files in $destFolder" -ForegroundColor Cyan
