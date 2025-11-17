import os
from PIL import Image

def optimize_image(input_path, output_path, max_size=(1920, 1080), quality=85):
    """
    Optimize an image by resizing and compressing it.
    
    Args:
        input_path (str): Path to the input image
        output_path (str): Path to save the optimized image
        max_size (tuple): Maximum dimensions (width, height)
        quality (int): JPEG quality (1-100)
    """
    try:
        with Image.open(input_path) as img:
            # Convert RGBA to RGB if necessary (for PNG files)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create a white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Resize image while maintaining aspect ratio
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
            # Save with optimization
            if output_path.lower().endswith('.jpg') or output_path.lower().endswith('.jpeg'):
                img.save(output_path, 'JPEG', quality=quality, optimize=True)
            elif output_path.lower().endswith('.png'):
                img.save(output_path, 'PNG', optimize=True)
            else:
                img.save(output_path, optimize=True)
                
        print(f"Optimized: {input_path} -> {output_path}")
        original_size = os.path.getsize(input_path)
        optimized_size = os.path.getsize(output_path)
        reduction = (original_size - optimized_size) / original_size * 100
        print(f"  Size reduction: {original_size/1024/1024:.1f}MB -> {optimized_size/1024/1024:.1f}MB ({reduction:.1f}% reduction)")
        
    except Exception as e:
        print(f"Error optimizing {input_path}: {str(e)}")

def main():
    # Define the public directory
    public_dir = 'public'
    
    # List of large images to optimize with their target sizes
    large_images = [
        # (input_filename, output_filename, max_size, quality)
        ('group-african-medical-students-posed-outdoor.jpg', 'group-african-medical-students-posed-outdoor.jpg', (1920, 1080), 80),
        ('interior-view-operating-room.jpg', 'interior-view-operating-room.jpg', (1920, 1080), 80),
        ('pharmacy service.jpg', 'pharmacy service.jpg', (1920, 1080), 80),
        ('pediatic.png', 'pediatic.png', (1200, 800), 85),
        ('otepedeic.png', 'otepedeic.png', (1200, 800), 85),
        ('suRGICAL.jpg', 'suRGICAL.jpg', (1200, 800), 80),
        ('diabetics.png', 'diabetics.png', (1200, 800), 85),
        ('facility 3.png', 'facility 3.png', (1200, 800), 85),
        ('faciliyy 4.png', 'faciliyy 4.png', (1200, 800), 85),
        ('gynecology .png', 'gynecology .png', (1200, 800), 85),
        ('lab service .png', 'lab service .png', (1200, 800), 85),
        ('neurology .png', 'neurology .png', (1200, 800), 85),
        ('oncology.png', 'oncology.png', (1200, 800), 85),
        ('out paitent service .png', 'out paitent service .png', (1200, 800), 85),
        ('rehabilitation .png', 'rehabilitation .png', (1200, 800), 85),
        ('crt scan .png', 'crt scan .png', (1200, 800), 85),
        ('Newark (1).jpg', 'Newark (1).jpg', (1920, 1080), 80),
    ]
    
    print("Starting image optimization...")
    
    for input_filename, output_filename, max_size, quality in large_images:
        input_path = os.path.join(public_dir, input_filename)
        output_path = os.path.join(public_dir, output_filename)
        
        # Check if file exists
        if os.path.exists(input_path):
            print(f"\nProcessing {input_filename}...")
            optimize_image(input_path, output_path, max_size, quality)
        else:
            print(f"File not found: {input_path}")
    
    print("\nImage optimization complete!")

if __name__ == "__main__":
    main()