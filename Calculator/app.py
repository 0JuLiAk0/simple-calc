import webbrowser
import os

script_path = os.path.dirname(os.path.abspath(__file__))
html_path = os.path.join(script_path, 'templates', 'templates.html')


if os.path.exists(html_path):
    print(html_path)
    webbrowser.open('file://' + html_path, new=2)
    # For Windows: replace backslashes with slashes so the browser understands the file URL:
    # webbrowser.open('file:///' + html_path.replace('\\', '/'), new=2)
else:
    print("There is no such file", html_path)
