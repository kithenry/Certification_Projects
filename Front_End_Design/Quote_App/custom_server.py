# custom_http_server.py
import http.server
import socketserver
import argparse

def run_server(host, port):
    # Handler for the server, you can change this to SimpleHTTPRequestHandler for default directory serving
    handler = http.server.SimpleHTTPRequestHandler

    # Create the server object
    with socketserver.TCPServer((host, port), handler) as httpd:
        print(f"Serving HTTP on {host} port {port} (http://{host}:{port}/) ...")
        httpd.serve_forever()

if __name__ == "__main__":
    # Argument parser setup
    parser = argparse.ArgumentParser(description='Run a simple HTTP server with custom host and port.')
    parser.add_argument('--host', default='localhost', help='Hostname (default: localhost)')
    parser.add_argument('--port', type=int, default=8000, help='Port number (default: 8000)')

    # Parse the command line arguments
    args = parser.parse_args()

    # Run the server with the provided host and port
    run_server(args.host, args.port)

