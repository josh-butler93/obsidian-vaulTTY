<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Container Daily Practice Guide</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0d0d0d;
            color: #e0e0e0;
            min-height: 100vh;
            line-height: 1.6;
        }

        .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 20px;
        }

        header {
            text-align: center;
            padding: 50px 20px;
            background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
            border-bottom: 1px solid #2a2a2a;
            margin-bottom: 30px;
        }

        header h1 {
            font-size: 2.2rem;
            color: #00ff88;
            text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
            letter-spacing: 1px;
        }

        header p {
            color: #888;
            margin-top: 10px;
            font-size: 1rem;
        }

        .hero-subtitle {
            margin-top: 20px;
            padding: 10px 20px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 25px;
            display: inline-block;
            border: 1px solid #2a2a2a;
        }

        .hero-subtitle span {
            color: #ff408f;
            font-weight: bold;
        }

        .tabs {
            display: flex;
            gap: 4px;
            background: #1a1a1a;
            padding: 4px;
            border-radius: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .tab-btn {
            flex: 1;
            min-width: 100px;
            padding: 12px 15px;
            background: transparent;
            border: none;
            color: #666;
            font-size: 0.85rem;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.3s;
        }

        .tab-btn:hover {
            color: #aaa;
            background: #2a2a2a;
        }

        .tab-btn.active {
            background: #2a2a2a;
            color: #00ff88;
            font-weight: bold;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .section {
            background: #141414;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            border: 1px solid #222;
        }

        .section h2 {
            color: #00ff88;
            margin-bottom: 20px;
            font-size: 1.3rem;
            padding-bottom: 10px;
            border-bottom: 1px solid #2a2a2a;
        }

        .section h3 {
            color: #ff408f;
            margin: 25px 0 15px;
            font-size: 1.1rem;
        }

        .section h4 {
            color: #00d4ff;
            margin: 15px 0 10px;
            font-size: 0.95rem;
        }

        .cmd-line {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            padding: 10px 15px;
            background: #0a0a0a;
            border-left: 3px solid #00ff88;
            margin: 8px 0;
            border-radius: 0 6px 6px 0;
        }

        .cmd-line .cmd {
            font-family: 'Consolas', 'Monaco', monospace;
            color: #00ff88;
            flex: 1;
            white-space: pre-wrap;
            word-break: break-all;
        }

        .cmd-line .desc {
            color: #777;
            font-size: 0.85rem;
            min-width: 200px;
        }

        .cmd-line.red { border-left-color: #ff4444; }
        .cmd-line.red .cmd { color: #ff6b6b; }

        .cmd-line.yellow { border-left-color: #ffaa00; }
        .cmd-line.yellow .cmd { color: #ffc107; }

        .cmd-line.blue { border-left-color: #00d4ff; }
        .cmd-line.blue .cmd { color: #00d4ff; }

        .cmd-line.purple { border-left-color: #bb86fc; }
        .cmd-line.purple .cmd { color: #bb86fc; }

        .week-card {
            background: #1a1a1a;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid #2a2a2a;
        }

        .week-card h4 {
            color: #00ff88;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .week-card h4 .day {
            background: #2a2a2a;
            color: #888;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
        }

        .week-card h4 .week-num {
            background: #2a2a2a;
            color: #888;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
        }

        .week-card .goal {
            color: #ffaa00;
            font-style: italic;
            margin-bottom: 15px;
            font-size: 0.9rem;
        }

        .cmd-block {
            background: #0a0a0a;
            border: 1px solid #2a2a2a;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.9rem;
            color: #00ff88;
            white-space: pre-wrap;
            word-break: break-all;
        }

        .tag {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: bold;
        }

        .tag.green { background: rgba(0, 255, 136, 0.2); color: #00ff88; }
        .tag.red { background: rgba(255, 68, 68, 0.2); color: #ff6b6b; }
        .tag.yellow { background: rgba(255, 170, 0, 0.2); color: #ffc107; }
        .tag.blue { background: rgba(0, 212, 255, 0.2); color: #00d4ff; }
        .tag.purple { background: rgba(187, 134, 252, 0.2); color: #bb86fc; }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            background: #0a0a0a;
            border-radius: 8px;
            overflow: hidden;
        }

        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #2a2a2a;
        }

        th {
            background: #1a1a1a;
            color: #00ff88;
            font-size: 0.9rem;
        }

        td {
            color: #ccc;
            font-size: 0.9rem;
        }

        tr:hover {
            background: rgba(0, 255, 136, 0.05);
        }

        .mindset-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .mindset-card {
            background: #1a1a1a;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            border: 1px solid #2a2a2a;
        }

        .mindset-card .icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }

        .mindset-card h4 {
            color: #fff;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }

        .mindset-card .use-case {
            color: #aaa;
            font-size: 0.9rem;
        }

        .workflow-box {
            background: #0a0a0a;
            border-radius: 10px;
            padding: 20px;
            border: 2px solid #2a2a2a;
        }

        .workflow-compare {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .workflow-box h4 {
            margin-bottom: 10px;
        }

        .workflow-box.db { border-color: #50fa7b; }
        .workflow-box.check { border-color: #ff79c6; }
        .workflow-box.dev { border-color: #bb86fc; }

        .workflow-box.db h4 { color: #50fa7b; }
        .workflow-box.check h4 { color: #ff79c6; }
        .workflow-box.dev h4 { color: #bb86fc; }

        .note {
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 6px;
            padding: 12px 15px;
            margin: 15px 0;
            color: #00d4ff;
            font-size: 0.9rem;
        }

        .danger-note {
            background: rgba(255, 68, 68, 0.1);
            border: 1px solid rgba(255, 68, 68, 0.3);
            border-radius: 6px;
            padding: 12px 15px;
            margin: 15px 0;
            color: #ff6b6b;
            font-size: 0.9rem;
        }

        footer {
            text-align: center;
            padding: 30px;
            color: #555;
            margin-top: 40px;
            border-top: 1px solid #1a1a1a;
        }

        footer span {
            color: #00ff88;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Container Daily Practice Guide</h1>
            <p>12-Week Journey from Beginner to DevOps Foundation</p>
            <div class="hero-subtitle">
                <span>Podman</span> • Docker • Containers • DevOps
            </div>
        </header>

        <div class="tabs">
            <button class="tab-btn active" onclick="openTab('quickref')">Quick Ref</button>
            <button class="tab-btn" onclick="openTab('flags')">Run Flags</button>
            <button class="tab-btn" onclick="openTab('cleanup')">Cleanup</button>
            <button class="tab-btn" onclick="openTab('week1')">Week 1-2</button>
            <button class="tab-btn" onclick="openTab('week3')">Week 3-4</button>
            <button class="tab-btn" onclick="openTab('week5')">Week 5-6</button>
            <button class="tab-btn" onclick="openTab('week7')">Week 7-9</button>
            <button class="tab-btn" onclick="openTab('mindset')">When to Use</button>
        </div>

        <!-- Quick Reference Tab -->
        <div id="quickref" class="tab-content active">
            <div class="section">
                <h2>Essential Commands</h2>
                
                <h3>Container Lifecycle</h3>
                <div class="cmd-line green">
                    <span class="cmd">podman run -d --name web nginx</span>
                    <span class="desc">Start detached</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">podman run -it --name test alpine sh</span>
                    <span class="desc">Start with terminal</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">podman run -dit --name practice alpine</span>
                    <span class="desc">Start detached, ready for exec</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">podman ps -a</span>
                    <span class="desc">List all containers</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd">podman exec -it web sh</span>
                    <span class="desc">Shell into container</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd">podman start / stop web</span>
                    <span class="desc">Start or stop container</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd">podman rm web</span>
                    <span class="desc">Remove container</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">podman logs web</span>
                    <span class="desc">View logs</span>
                </div>

                <h3>Images</h3>
                <div class="cmd-line">
                    <span class="cmd">podman images</span>
                    <span class="desc">List local images</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd">podman pull nginx:latest</span>
                    <span class="desc">Download image</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd">podman rmi nginx:latest</span>
                    <span class="desc">Remove image</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd">podman build -t myapp:v1 .</span>
                    <span class="desc">Build from Dockerfile</span>
                </div>

                <h3>Port Mapping & Volumes</h3>
                <div class="cmd-line green">
                    <span class="cmd">podman run -d -p 8080:80 nginx</span>
                    <span class="desc">Map ports</span>
                </div>
                <div class="cmd-line purple">
                    <span class="cmd">podman run -d -v mydata:/data postgres</span>
                    <span class="desc">Named volume</span>
                </div>
                <div class="cmd-line purple">
                    <span class="cmd">podman run -d -v /host:/container nginx</span>
                    <span class="desc">Bind mount</span>
                </div>

                <h3>Advanced</h3>
                <div class="cmd-line blue">
                    <span class="cmd">podman network create mynet</span>
                    <span class="desc">Create network</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd">podman compose up -d</span>
                    <span class="desc">Multi-container orchestration</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">podman stats --no-stream</span>
                    <span class="desc">Resource usage</span>
                </div>
            </div>

            <div class="section">
                <h2>Daily Practice Template</h2>
                <div class="note">
                    Morning routine script - 10-15 minutes
                </div>
                <div class="cmd-block">#!/bin/bash

echo "=== Container Daily Practice ==="

# 1. List current containers
podman ps -a

# 2. Clean up old containers
podman container prune -f

# 3. Remove dangling images
podman image prune -f

# 4. Pull latest images
podman pull alpine:latest
podman pull nginx:latest
podman pull ubuntu:latest

# 5. Quick test
podman run --rm alpine echo "Container runtime works!"

# 6. Check resource usage
podman stats --no-stream

# 7. Check disk usage
podman system df</div>
            </div>
        </div>

        <!-- Run Flags Tab -->
        <div id="flags" class="tab-content">
            <div class="section">
                <h2>The Three Main Patterns</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Flag</th>
                            <th>What it does</th>
                            <th>Stays running after exit?</th>
                            <th>Can exec later?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span class="tag green">-d</span></td>
                            <td>Detached (background)</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td><span class="tag yellow">-it</span></td>
                            <td>Interactive terminal</td>
                            <td>No (stops)</td>
                            <td>Yes (after start)</td>
                        </tr>
                        <tr>
                            <td><span class="tag green">-dit</span></td>
                            <td>Detached but ready for exec</td>
                            <td>Yes</td>
                            <td>Yes</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="section">
                <h2>Flag Details</h2>

                <h4><span class="tag green">-d</span> Detached</h4>
                <p style="color: #888; margin: 10px 0;">Container starts in background, no terminal attached, keeps running</p>
                <div class="cmd-block">podman run -d --name web nginx</div>

                <h4><span class="tag yellow">-it</span> Interactive Terminal</h4>
                <p style="color: #888; margin: 10px 0;">Container starts, you're dropped into shell. Exit = container stops</p>
                <div class="cmd-block">podman run -it --name test alpine sh</div>

                <h4><span class="tag green">-dit</span> Detached + Interactive</h4>
                <p style="color: #888; margin: 10px 0;">Same as -d, but signals "future exec commands will be interactive"</p>
                <div class="cmd-block">podman run -dit --name practice alpine</div>
            </div>

            <div class="section">
                <h2>Common Flag Combinations</h2>

                <h4>Detached with port mapping</h4>
                <div class="cmd-block">podman run -d --name web -p 8080:80 nginx</div>

                <h4>Interactive with cleanup</h4>
                <div class="cmd-block">podman run -it --rm alpine sh</div>

                <h4>Detached with volume</h4>
                <div class="cmd-block">podman run -dit -v $(pwd):/app --name dev alpine</div>

                <h4>Detached with environment variables</h4>
                <div class="cmd-block">podman run -d --name db \
  -e POSTGRES_PASSWORD=secret \
  postgres</div>

                <h4>Detached with resource limits</h4>
                <div class="cmd-block">podman run -d --name limited \
  --memory="512m" \
  --cpus="0.5" \
  nginx</div>
            </div>

            <div class="section">
                <h2>Quick Decision Guide</h2>
                <div class="cmd-block">Need shell RIGHT NOW?
  ├── Yes → -it (you stay in terminal)
  └── No (start and leave)
      ├── Will need shell LATER?
      │   ├── Yes → -d
      │   └── No → -d
      └── Not sure → -d (you can always exec later)</div>
            </div>

            <div class="section">
                <h2>Magic Keys</h2>
                <div class="cmd-line yellow">
                    <span class="cmd">Ctrl+P, Ctrl+Q</span>
                    <span class="desc">Detach from -it without stopping container</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd">Ctrl+C</span>
                    <span class="desc">Force stop (if running foreground)</span>
                </div>
            </div>
        </div>

        <!-- Cleanup Tab -->
        <div id="cleanup" class="tab-content">
            <div class="section">
                <h2>Container Cleanup</h2>

                <h3>Remove Single Container</h3>
                <div class="cmd-line green">
                    <span class="cmd">podman rm container-name</span>
                    <span class="desc">Remove stopped container</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd">podman rm -f container-name</span>
                    <span class="desc">Force remove (even if running)</span>
                </div>

                <h3>Remove Multiple Containers</h3>
                <div class="cmd-block"># By names
podman rm container1 container2 container3

# All stopped containers
podman container prune

# All containers (force)
podman rm -a

# All containers (force, single command)
podman rm -f $(podman ps -aq)</div>

                <h3>Remove Containers by Filter</h3>
                <div class="cmd-block"># Remove exited containers
podman rm $(podman ps -aq --filter status=exited)

# Remove containers older than a day
podman rm --filter "until=24h"

# Remove containers not running
podman container prune -f</div>
            </div>

            <div class="section">
                <h2>Image Cleanup</h2>

                <h3>Remove Single Image</h3>
                <div class="cmd-line green">
                    <span class="cmd">podman rmi image-name:tag</span>
                    <span class="desc">Remove specific image</span>
                </div>

                <h3>Remove Multiple Images</h3>
                <div class="cmd-block"># By names
podman rmi nginx:latest ubuntu:22.04

# All unused images
podman image prune

# All unused images (force)
podman image prune -a

# Dangling images only
podman image prune -f</div>

                <div class="cmd-line yellow">
                    <span class="cmd">podman image prune -a</span>
                    <span class="desc">Remove all images not used by containers</span>
                </div>
            </div>

            <div class="section">
                <h2>Volume Cleanup</h2>

                <div class="cmd-line green">
                    <span class="cmd">podman volume ls</span>
                    <span class="desc">List volumes first</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">podman volume rm volume-name</span>
                    <span class="desc">Remove specific volume</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd">podman volume prune</span>
                    <span class="desc">Remove all unused volumes</span>
                </div>
            </div>

            <div class="section">
                <h2>Network Cleanup</h2>

                <div class="cmd-line green">
                    <span class="cmd">podman network ls</span>
                    <span class="desc">List networks</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">podman network rm network-name</span>
                    <span class="desc">Remove specific network</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">podman network prune</span>
                    <span class="desc">Remove all unused networks</span>
                </div>
            </div>

            <div class="section">
                <h2>Complete System Cleanup</h2>

                <div class="cmd-line yellow">
                    <span class="cmd">podman system prune</span>
                    <span class="desc">Remove stopped containers, unused networks, dangling images</span>
                </div>

                <div class="cmd-line red">
                    <span class="cmd">podman system prune -a</span>
                    <span class="desc">Everything above + all unused images</span>
                </div>

                <div class="danger-note">
                    <strong>WARNING:</strong> The following removes EVERYTHING - use with extreme caution!
                </div>

                <div class="cmd-line red">
                    <span class="cmd">podman system prune --volumes</span>
                    <span class="desc">Everything above + unused volumes</span>
                </div>

                <h3>Full Nuclear Cleanup</h3>
                <div class="cmd-block"># Stop all containers
podman stop $(podman ps -aq)

# Remove all containers
podman rm -a

# Remove all images
podman rmi -a

# Remove all volumes
podman volume prune -f

# Remove all networks (except default)
podman network prune -f

# Full system cleanup
podman system prune -a --volumes -f</div>
            </div>

            <div class="section">
                <h2>Cleanup Best Practices</h2>

                <div class="note">
                    <strong>Daily Cleanup</strong> - Run these safely every day
                </div>
                <div class="cmd-block"># Remove stopped containers
podman container prune -f

# Remove dangling images
podman image prune -f</div>

                <div class="note">
                    <strong>Weekly Cleanup</strong> - More thorough cleanup
                </div>
                <div class="cmd-block"># Remove unused images
podman image prune -a

# Check disk usage
podman system df</div>

                <h3>Safety Levels</h3>
                <div class="cmd-line green">
                    <span class="cmd">container prune -f</span>
                    <span class="desc">Safe - only removes stopped</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">image prune -f</span>
                    <span class="desc">Safe - only removes dangling</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">image prune -a</span>
                    <span class="desc">Careful - removes all unused</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd">system prune -a --volumes</span>
                    <span class="desc">Dangerous - removes everything!</span>
                </div>
            </div>
        </div>

        <!-- Week 1-2 Tab -->
        <div id="week1" class="tab-content">
            <div class="section">
                <h2>Week 1: Container Lifecycle Basics</h2>
                <p class="goal">Goal: Master the run/exec/rm cycle</p>

                <div class="week-card">
                    <h4><span class="day">Days 1-2</span> nginx basics</h4>
                    <div class="cmd-block">podman pull nginx
podman run -dit --name practice nginx
podman ps</div>
                    <h4>Inside container:</h4>
                    <div class="cmd-block">ls -la /usr/share/nginx/html/
cat /etc/nginx/nginx.conf
ps aux
whoami
exit</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 3-4</span> Ubuntu container</h4>
                    <div class="cmd-block">podman run -dit --name ubuntu-practice ubuntu
podman exec -it ubuntu-practice bash</div>
                    <h4>Inside container:</h4>
                    <div class="cmd-block">apt update
apt install -y curl vim
curl --version
which curl
exit</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 5-7</span> Alpine (minimal)</h4>
                    <div class="cmd-block">podman run -dit --name alpine-practice alpine
podman exec -it alpine-practice sh</div>
                    <h4>Inside container:</h4>
                    <div class="cmd-block">apk add curl
curl -I https://example.com
exit</div>
                </div>

                <h3>Commands to Master</h3>
                <div class="cmd-line green">
                    <span class="cmd">podman run -d</span>
                    <span class="desc">Detached</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">podman run -it</span>
                    <span class="desc">Interactive</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">podman exec -it</span>
                    <span class="desc">Enter running container</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd">podman stop / podman start</span>
                    <span class="desc">Stop and start</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd">podman rm (-f)</span>
                    <span class="desc">Remove container</span>
                </div>
            </div>

            <div class="section">
                <h2>Week 2: Port Mapping & Networking</h2>
                <p class="goal">Goal: Access containers and understand networking</p>

                <div class="week-card">
                    <h4><span class="day">Days 1-2</span> Port mapping</h4>
                    <div class="cmd-block">podman run -d --name web -p 8080:80 nginx
curl localhost:8080
podman port web</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 3-4</span> Multiple ports</h4>
                    <div class="cmd-block">podman run -d --name app \
  -p 3000:3000 \
  -p 9229:9229 \
  node:alpine

podman logs app</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 5-6</span> Custom networks</h4>
                    <div class="cmd-block">podman network create mynet
podman run -d --name db \
  --network mynet \
  postgres

podman run -dit --name app \
  --network mynet \
  alpine

podman exec app ping -c 2 db</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Day 7</span> Inspect networking</h4>
                    <div class="cmd-block">podman inspect web | grep -A 20 Networks
podman network ls</div>
                </div>
            </div>
        </div>

        <!-- Week 3-4 Tab -->
        <div id="week3" class="tab-content">
            <div class="section">
                <h2>Week 3: Volumes & Data Persistence</h2>
                <p class="goal">Goal: Store data outside containers</p>

                <div class="week-card">
                    <h4><span class="day">Days 1-2</span> Bind mounts</h4>
                    <div class="cmd-block">mkdir -p ~/container-data

podman run -d --name webdata \
  -v ~/container-data:/usr/share/nginx/html \
  nginx

echo "&lt;h1&gt;Hello from host&lt;/h1&gt;" &gt; ~/container-data/index.html

curl localhost:8080</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 3-4</span> Named volumes</h4>
                    <div class="cmd-block">podman volume create mydata

podman run -dit -v mydata:/data alpine

podman exec alpine sh -c "echo 'data' &gt; /data/file.txt"

podman rm -f alpine

podman run -dit -v mydata:/data alpine

podman exec alpine cat /data/file.txt
# Data preserved!</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 5-6</span> Database with volume</h4>
                    <div class="cmd-block">podman run -d --name postgresdb \
  -v pgdata:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret \
  postgres

podman exec -it postgresdb psql -U postgres</div>
                    <h4>Inside psql:</h4>
                    <div class="cmd-block">CREATE DATABASE testdb;
\l
\q</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Day 7</span> Backup and restore</h4>
                    <div class="cmd-block">podman run --rm \
  -v mydata:/data \
  -v $(pwd):/backup \
  alpine \
  tar czf /backup/backup.tar.gz /data</div>
                </div>
            </div>

            <div class="section">
                <h2>Week 4: Building Custom Images</h2>
                <p class="goal">Goal: Create your own container images</p>

                <div class="week-card">
                    <h4><span class="day">Days 1-2</span> Simple Dockerfile</h4>
                    <div class="cmd-block">FROM alpine:latest

RUN apk add --no-cache curl vim

WORKDIR /app

COPY . .

CMD ["sh"]</div>
                    <div style="margin-top: 15px;">
                        <strong>Build and run:</strong>
                    </div>
                    <div class="cmd-block">podman build -t myalpine:v1 .
podman run -it myalpine:v1</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 3-4</span> Web app Dockerfile</h4>
                    <div class="cmd-block">FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 5-6</span> Multi-stage build</h4>
                    <div class="cmd-block"># Build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80</div>
                </div>

                <h3>Dockerfile Keywords to Master</h3>
                <div class="cmd-line green">
                    <span class="cmd">FROM</span>
                    <span class="desc">Base image</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd">RUN</span>
                    <span class="desc">Execute commands</span>
                </div>
                <div class="cmd-line purple">
                    <span class="cmd">COPY / ADD</span>
                    <span class="desc">Files</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">WORKDIR</span>
                    <span class="desc">Set directory</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">EXPOSE</span>
                    <span class="desc">Documentation</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd">CMD / ENTRYPOINT</span>
                    <span class="desc">Startup command</span>
                </div>
            </div>
        </div>

        <!-- Week 5-6 Tab -->
        <div id="week5" class="tab-content">
            <div class="section">
                <h2>Week 5: Environment Variables</h2>
                <p class="goal">Goal: Configure containers dynamically</p>

                <div class="week-card">
                    <h4><span class="day">Days 1-2</span> -e flag</h4>
                    <div class="cmd-block">podman run -e MY_VAR=hello \
  alpine echo $MY_VAR

podman run -d --name db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_DB=mydb \
  postgres

podman exec db env | grep POSTGRES</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 3-4</span> .env file</h4>
                    <div class="cmd-block">cat &gt; .env &lt;&lt; 'EOF'
DB_PASSWORD=secret123
API_KEY=abc123
DEBUG=true
EOF

podman run --env-file .env \
  alpine env</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 5-6</span> Config files via volumes</h4>
                    <div class="cmd-block">podman run -v ~/nginx-conf:/etc/nginx/conf.d nginx</div>
                </div>
            </div>

            <div class="section">
                <h2>Week 6: Logs, Inspection & Troubleshooting</h2>
                <p class="goal">Goal: Debug and monitor containers</p>

                <div class="week-card">
                    <h4><span class="day">Basic logging</span></h4>
                    <div class="cmd-block">podman logs webserver
podman logs -f webserver
podman logs --tail 20 webserver</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Inspection</span></h4>
                    <div class="cmd-block">podman inspect webserver

podman inspect --format '{{.NetworkSettings.IPAddress}}' webserver

podman inspect --format '{{.Config.Image}}' webserver</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Resource usage</span></h4>
                    <div class="cmd-block">podman stats webserver
podman top webserver</div>
                </div>

                <h3>Troubleshooting Flow</h3>
                <div class="cmd-line yellow">
                    <span class="cmd">podman ps</span>
                    <span class="desc">Is it running?</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd">podman port container</span>
                    <span class="desc">Check port mapping</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">podman logs container</span>
                    <span class="desc">Check logs</span>
                </div>
                <div class="cmd-line purple">
                    <span class="cmd">podman inspect container</span>
                    <span class="desc">Deep inspection</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">podman exec -it container sh</span>
                    <span class="desc">Go inside and investigate</span>
                </div>
            </div>
        </div>

        <!-- Week 7-9 Tab -->
        <div id="week7" class="tab-content">
            <div class="section">
                <h2>Week 7: Docker Compose Basics</h2>
                <p class="goal">Goal: Orchestrate multi-container apps</p>

                <div class="week-card">
                    <h4><span class="day">First compose file</span></h4>
                    <div class="cmd-block">version: '3.8'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:</div>
                </div>

                <h3>Compose Commands</h3>
                <div class="cmd-block">podman compose up -d
podman compose down
podman compose ps
podman compose logs -f
podman compose exec web sh
podman compose restart
podman compose build</div>
            </div>

            <div class="section">
                <h2>Week 8: Compose Advanced</h2>

                <div class="week-card">
                    <h4><span class="day">Networks</span></h4>
                    <div class="cmd-block">services:
  frontend:
    networks:
      - webnet
  backend:
    networks:
      - webnet
      - dbnet
  db:
    networks:
      - dbnet

networks:
  webnet:
  dbnet:</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Healthchecks</span></h4>
                    <div class="cmd-block">services:
  web:
    image: nginx
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3</div>
                </div>
            </div>

            <div class="section">
                <h2>Week 9: Security & Production Hardening</h2>

                <div class="week-card">
                    <h4><span class="day">Non-root users</span></h4>
                    <div class="cmd-block"># In Dockerfile:
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Resource limits</span></h4>
                    <div class="cmd-block">podman run -d \
  --name limited \
  --memory="512m" \
  --cpus="0.5" \
  nginx</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Read-only containers</span></h4>
                    <div class="cmd-block">podman run --read-only --name secured alpine sh</div>
                </div>

                <h3>Security Checklist</h3>
                <div class="cmd-line green">
                    <span class="cmd">no-new-privileges: true</span>
                    <span class="desc">Prevent privilege escalation</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd">read_only: true</span>
                    <span class="desc">Read-only filesystem</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">tmpfs: /tmp</span>
                    <span class="desc">Temporary files in memory</span>
                </div>
                <div class="cmd-line purple">
                    <span class="cmd">memory/CPUs limits</span>
                    <span class="desc">Resource constraints</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">Non-root user</span>
                    <span class="desc">Don't run as root</span>
                </div>
            </div>

            <div class="section">
                <h2>Week 10-12+: Real-World Projects</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Skills Applied</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Personal blog (WordPress/Ghost)</td>
                            <td>Volumes, compose, networking</td>
                        </tr>
                        <tr>
                            <td>Pi-hole DNS server</td>
                            <td>Single service, persistence</td>
                        </tr>
                        <tr>
                            <td>Home media server (Jellyfin)</td>
                            <td>GPUs, volumes, networking</td>
                        </tr>
                        <tr>
                            <td>Git server (Gitea)</td>
                            <td>Database, volumes, reverse proxy</td>
                        </tr>
                        <tr>
                            <td>Monitoring stack (Prometheus + Grafana)</td>
                            <td>Multi-container, networking</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Mindset Tab -->
        <div id="mindset" class="tab-content">
            <div class="section">
                <h2>When to Use Each Flag (The Mindset)</h2>
                
                <div class="mindset-grid">
                    <div class="mindset-card">
                        <div class="icon">🚀</div>
                        <h4>-d (Start and Forget)</h4>
                        <p class="use-case">
                            Running services (web servers, databases, APIs)<br>
                            Anything that needs to keep running continuously<br>
                            You need to exec in periodically to check/monitor
                        </p>
                    </div>

                    <div class="mindset-card">
                        <div class="icon">⚡</div>
                        <h4>-it (Quick Task)</h4>
                        <p class="use-case">
                            Testing a tool or exploring an image<br>
                            One-time setup or troubleshooting<br>
                            Teaching/demos where you want to show what happens inside
                        </p>
                    </div>

                    <div class="mindset-card">
                        <div class="icon">💻</div>
                        <h4>-dit (Dev Workspace)</h4>
                        <p class="use-case">
                            Prepping containers you'll need throughout your day<br>
                            Creating a persistent workspace<br>
                            Development environments you want running
                        </p>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Real-World Workflow Comparison</h2>
                <div class="workflow-compare">
                    <div class="workflow-box db">
                        <h4>DATABASE - Use -d</h4>
                        <p style="color: #888; margin-bottom: 10px;">Runs all day, exec when needed</p>
                        <div class="cmd-block">podman run -d --name postgres \
  -e POSTGRES_PASSWORD=secret postgres
podman exec -it postgres psql -U postgres
# Container keeps running</div>
                    </div>

                    <div class="workflow-box check">
                        <h4>QUICK CHECK - Use -it --rm</h4>
                        <p style="color: #888; margin-bottom: 10px;">One glance, done, auto-cleanup</p>
                        <div class="cmd-block">podman run -it --rm alpine \
  cat /etc/os-release
# You got your answer</div>
                    </div>

                    <div class="workflow-box dev">
                        <h4>DEV WORKSPACE - Use -dit</h4>
                        <p style="color: #888; margin-bottom: 10px;">Prep once, use all day</p>
                        <div class="cmd-block">podman run -dit -v ~/project:/app \
  --name dev alpine
# First time: set things up
# Later: just exec in when ready</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Quick Reference Summary</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Scenario</th>
                            <th>Flag</th>
                            <th>Why</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Web server</td>
                            <td><span class="tag green">-d</span></td>
                            <td>Needs to keep running</td>
                        </tr>
                        <tr>
                            <td>Database</td>
                            <td><span class="tag green">-d</span></td>
                            <td>Long-running service</td>
                        </tr>
                        <tr>
                            <td>Quick test</td>
                            <td><span class="tag yellow">-it --rm</span></td>
                            <td>One-off, auto-cleanup</td>
                        </tr>
                        <tr>
                            <td>Exploring an image</td>
                            <td><span class="tag yellow">-it</span></td>
                            <td>Just looking around</td>
                        </tr>
                        <tr>
                            <td>Dev workspace</td>
                            <td><span class="tag green">-dit</span></td>
                            <td>Persistent, you'll return</td>
                        </tr>
                        <tr>
                            <td>One-time script</td>
                            <td><span class="tag yellow">-it --rm</span></td>
                            <td>Run and done</td>
                        </tr>
                        <tr>
                            <td>Monitoring tool</td>
                            <td><span class="tag green">-d</span></td>
                            <td>Background process</td>
                        </tr>
                        <tr>
                            <td>Teaching</td>
                            <td><span class="tag yellow">-it</span></td>
                            <td>Show and explain</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <footer>
        <p>Practice <span>15-30 minutes daily</span> • Consistency beats intensity</p>
    </footer>

    <script>
        function openTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }
    </script>
</body>
</html>
