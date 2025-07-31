import sys
import re

def main():
    if len(sys.argv) != 6:
        print("Usage: python3 script.py file repo_owner repo_name commit_sha branch")
        sys.exit(1)
        
    file_path = sys.argv[1]
    repo_owner = sys.argv[2]
    repo_name = sys.argv[3]
    commit_sha = sys.argv[4]
    branch = sys.argv[5]
    
    base_url = f"https://raw.githubusercontent.com/{repo_owner}/{repo_name}/{branch}/"
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Pattern 1: HTML img tags with relative paths
        content = re.sub(
            r'<img([^>]*?)src="\.\.?/([^"]*)"',
            f'<img\\1src="{base_url}\\2"',
            content
        )
        
        # Pattern 1b: Fix existing raw.githubusercontent.com links with ../
        content = re.sub(
            r'<img([^>]*?)src="https://raw\.githubusercontent\.com/([^/]+)/([^/]+)/[^/]+/\.\.?/([^"]*)"',
            f'<img\\1src="{base_url}\\4"',
            content
        )
        
        # Pattern 1c: Fix existing raw.githubusercontent.com links without ../
        content = re.sub(
            r'<img([^>]*?)src="https://raw\.githubusercontent\.com/([^/]+)/([^/]+)/[^/]+/([^"]*)"',
            f'<img\\1src="{base_url}\\4"',
            content
        )
        
        # Pattern 1d: Fix existing GitHub blob links
        content = re.sub(
            r'<img([^>]*?)src="https://github\.com/([^/]+)/([^/]+)/blob/[^/]+/([^"?]*?)(?:\?raw=true)?"',
            f'<img\\1src="{base_url}\\4"',
            content
        )
        
        # Pattern 2: Markdown image syntax
        content = re.sub(
            r'!\[([^\]]*?)\]\(\.\.?/([^)]*?)\)',
            f'![\\1]({base_url}\\2)',
            content
        )
        
        # Pattern 2b: Fix existing raw.githubusercontent.com markdown images with ../
        content = re.sub(
            r'!\[([^\]]*?)\]\(https://raw\.githubusercontent\.com/([^/]+)/([^/]+)/[^/]+/\.\.?/([^)]*?)\)',
            f'![\\1]({base_url}\\4)',
            content
        )
        
        # Pattern 2c: Fix existing raw.githubusercontent.com markdown images without ../
        content = re.sub(
            r'!\[([^\]]*?)\]\(https://raw\.githubusercontent\.com/([^/]+)/([^/]+)/[^/]+/([^)]*?)\)',
            f'![\\1]({base_url}\\4)',
            content
        )
        
        # Pattern 2d: Fix existing GitHub blob markdown images
        content = re.sub(
            r'!\[([^\]]*?)\]\(https://github\.com/([^/]+)/([^/]+)/blob/[^/]+/([^)?]*?)(?:\?raw=true)?\)',
            f'![\\1]({base_url}\\4)',
            content
        )
        
        # Pattern 3: Markdown links to images
        content = re.sub(
            r'\[([^\]]*?)\]\(\.\.?/([^)]*?\.(png|jpg|jpeg|gif|svg|webp))\)',
            f'[\\1]({base_url}\\2)',
            content,
            flags=re.IGNORECASE
        )
        
        # Pattern 3b: Fix existing raw.githubusercontent.com markdown links with ../
        content = re.sub(
            r'\[([^\]]*?)\]\(https://raw\.githubusercontent\.com/([^/]+)/([^/]+)/[^/]+/\.\.?/([^)]*?\.(png|jpg|jpeg|gif|svg|webp))\)',
            f'[\\1]({base_url}\\4)',
            content,
            flags=re.IGNORECASE
        )
        
        # Pattern 3c: Fix existing raw.githubusercontent.com markdown links without ../
        content = re.sub(
            r'\[([^\]]*?)\]\(https://raw\.githubusercontent\.com/([^/]+)/([^/]+)/[^/]+/([^)]*?\.(png|jpg|jpeg|gif|svg|webp))\)',
            f'[\\1]({base_url}\\4)',
            content,
            flags=re.IGNORECASE
        )
        
        # Pattern 3d: Fix existing GitHub blob markdown links
        content = re.sub(
            r'\[([^\]]*?)\]\(https://github\.com/([^/]+)/([^/]+)/blob/[^/]+/([^)?]*?\.(png|jpg|jpeg|gif|svg|webp))(?:\?raw=true)?\)',
            f'[\\1]({base_url}\\4)',
            content,
            flags=re.IGNORECASE
        )
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print("File updated successfully")
            print("CHANGED")
        else:
            print("No changes needed")
            print("UNCHANGED")
            
    except Exception as e:
        print(f"Error processing file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
