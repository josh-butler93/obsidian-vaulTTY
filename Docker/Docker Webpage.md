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

        .runtime-toggle {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 25px 0;
        }

        .runtime-btn {
            padding: 12px 35px;
            font-size: 1rem;
            font-weight: bold;
            border: 2px solid #333;
            background: #1a1a1a;
            color: #888;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .runtime-btn:hover {
            border-color: #555;
            color: #aaa;
        }

        .runtime-btn.active.docker {
            border-color: #2496ed;
            color: #2496ed;
            background: rgba(36, 150, 237, 0.1);
            box-shadow: 0 0 20px rgba(36, 150, 237, 0.2);
        }

        .runtime-btn.active.podman {
            border-color: #ff408f;
            color: #ff408f;
            background: rgba(255, 64, 143, 0.1);
            box-shadow: 0 0 20px rgba(255, 64, 143, 0.2);
        }

        .runtime-indicator {
            text-align: center;
            color: #555;
            font-size: 0.85rem;
            margin-bottom: 20px;
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
        }

        .cmd-line .desc {
            color: #777;
            font-size: 0.85rem;
            min-width: 200px;
        }

        .cmd-line.red {
            border-left-color: #ff4444;
        }

        .cmd-line.red .cmd {
            color: #ff6b6b;
        }

        .cmd-line.yellow {
            border-left-color: #ffaa00;
        }

        .cmd-line.yellow .cmd {
            color: #ffc107;
        }

        .cmd-line.blue {
            border-left-color: #00d4ff;
        }

        .cmd-line.blue .cmd {
            color: #00d4ff;
        }

        .cmd-line.purple {
            border-left-color: #bb86fc;
        }

        .cmd-line.purple .cmd {
            color: #bb86fc;
        }

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

        .week-card .goal {
            color: #ffaa00;
            font-style: italic;
            margin-bottom: 15px;
            font-size: 0.9rem;
        }

        .grid-2 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

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

        .workflow-box {
            background: #0a0a0a;
            border-radius: 10px;
            padding: 20px;
            border: 2px solid #2a2a2a;
        }

        .workflow-box h4 {
            margin-bottom: 10px;
        }

        .workflow-box code {
            display: block;
            background: #1a1a1a;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            color: #00ff88;
            font-size: 0.85rem;
            white-space: pre-wrap;
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

        .hidden {
            display: none !important;
        }

        .note {
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 6px;
            padding: 12px 15px;
            margin: 15px 0;
            color: #00d4ff;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Container Daily Practice Guide</h1>
            <p>12-Week Journey from Beginner to DevOps Foundation</p>
            
            <div class="runtime-toggle">
                <button class="runtime-btn podman active" onclick="setRuntime('podman')">Podman</button>
                <button class="runtime-btn docker" onclick="setRuntime('docker')">Docker</button>
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
        </div>

        <!-- Quick Reference Tab -->
        <div id="quickref" class="tab-content active">
            <div class="section">
                <h2>Essential Commands</h2>
                
                <h3>Container Lifecycle</h3>
                <div class="cmd-line">
                    <span class="cmd runtime">run</span>
                    <span class="desc">Create and start container</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">ps -a</span>
                    <span class="desc">List all containers</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">exec -it</span>
                    <span class="desc">Execute command in running container</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">start</span>
                    <span class="desc">Start stopped container</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">stop</span>
                    <span class="desc">Stop running container</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">rm</span>
                    <span class="desc">Remove container</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">logs</span>
                    <span class="desc">View container logs</span>
                </div>

                <h3>Image Management</h3>
                <div class="cmd-line">
                    <span class="cmd runtime">images</span>
                    <span class="desc">List local images</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">pull</span>
                    <span class="desc">Download image</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">rmi</span>
                    <span class="desc">Remove image</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">build</span>
                    <span class="desc">Build from Dockerfile</span>
                </div>

                <h3>Networking</h3>
                <div class="cmd-line blue">
                    <span class="cmd runtime">network ls</span>
                    <span class="desc">List networks</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd runtime">network create</span>
                    <span class="desc">Create network</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd runtime">network inspect</span>
                    <span class="desc">Inspect network</span>
                </div>

                <h3>Volumes</h3>
                <div class="cmd-line purple">
                    <span class="cmd runtime">volume ls</span>
                    <span class="desc">List volumes</span>
                </div>
                <div class="cmd-line purple">
                    <span class="cmd runtime">volume create</span>
                    <span class="desc">Create volume</span>
                </div>
                <div class="cmd-line purple">
                    <span class="cmd runtime">volume rm</span>
                    <span class="desc">Remove volume</span>
                </div>

                <h3>System</h3>
                <div class="cmd-line yellow">
                    <span class="cmd runtime">system df</span>
                    <span class="desc">Show disk usage</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd runtime">system prune</span>
                    <span class="desc">Clean unused resources</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd runtime">stats</span>
                    <span class="desc">Live resource usage</span>
                </div>
            </div>

            <div class="section">
                <h2>Daily Practice Template</h2>
                <div class="cmd-block">#!/bin/bash
# Morning routine - 10-15 minutes

echo "=== Container Daily Practice ==="

# 1. List current containers
runtime ps -a

# 2. Clean up old containers
runtime container prune -f

# 3. Pull latest images
runtime pull alpine:latest
runtime pull nginx:latest
runtime pull ubuntu:latest

# 4. Quick test
runtime run --rm alpine echo "Container runtime works!"

# 5. Check resource usage
runtime stats --no-stream</div>
                <div class="note">Replace <code>runtime</code> with <code>docker</code> or <code>podman</code></div>
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
                <div class="cmd-block">runtime run -d --name web nginx</div>

                <h4><span class="tag yellow">-it</span> Interactive Terminal</h4>
                <p style="color: #888; margin: 10px 0;">Container starts, you're dropped into shell. Exit = container stops</p>
                <div class="cmd-block">runtime run -it --name test alpine sh</div>

                <h4><span class="tag green">-dit</span> Detached + Interactive</h4>
                <p style="color: #888; margin: 10px 0;">Same as -d, but signals "future exec commands will be interactive"</p>
                <div class="cmd-block">runtime run -dit --name practice alpine</div>
            </div>

            <div class="section">
                <h2>Common Flag Combinations</h2>

                <h4>Detached with port mapping</h4>
                <div class="cmd-block">runtime run -d --name web -p 8080:80 nginx</div>

                <h4>Interactive with cleanup</h4>
                <div class="cmd-block">runtime run -it --rm alpine sh</div>

                <h4>Detached with volume</h4>
                <div class="cmd-block">runtime run -dit -v $(pwd):/app --name dev alpine</div>

                <h4>Detached with environment variables</h4>
                <div class="cmd-block">runtime run -d --name db \
  -e POSTGRES_PASSWORD=secret \
  postgres</div>

                <h4>Detached with resource limits</h4>
                <div class="cmd-block">runtime run -d --name limited \
  --memory="512m" \
  --cpus="0.5" \
  nginx</div>
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
                <div class="cmd-line">
                    <span class="cmd runtime">rm container-name</span>
                    <span class="desc">Remove stopped container</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd runtime">rm -f container-name</span>
                    <span class="desc">Force remove (even if running)</span>
                </div>

                <h3>Remove Multiple Containers</h3>
                <div class="cmd-block"># By names
runtime rm container1 container2 container3

# All stopped containers
runtime container prune

# All containers (force)
runtime rm -a

# All containers (force, single command)
runtime rm -f $(runtime ps -aq)</div>

                <h3>Remove Containers by Filter</h3>
                <div class="cmd-block"># Remove exited containers
runtime rm $(runtime ps -aq --filter status=exited)

# Remove containers older than a day
runtime rm --filter "until=24h"

# Remove containers not running
runtime container prune -f</div>

                <div class="note">Use <code>--filter</code> with: status, name, id, before, since</div>
            </div>

            <div class="section">
                <h2>Image Cleanup</h2>

                <h3>Remove Single Image</h3>
                <div class="cmd-line">
                    <span class="cmd runtime">rmi image-name:tag</span>
                    <span class="desc">Remove specific image</span>
                </div>

                <h3>Remove Multiple Images</h3>
                <div class="cmd-block"># By names
runtime rmi nginx:latest ubuntu:22.04

# All unused images
runtime image prune

# All unused images (force)
runtime image prune -a

# Dangling images only
runtime image prune -f</div>

                <div class="cmd-line yellow">
                    <span class="cmd runtime">image prune -a</span>
                    <span class="desc">Remove all images not used by containers</span>
                </div>
            </div>

            <div class="section">
                <h2>Volume Cleanup</h2>

                <div class="cmd-line">
                    <span class="cmd runtime">volume ls</span>
                    <span class="desc">List volumes first</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">volume rm volume-name</span>
                    <span class="desc">Remove specific volume</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd runtime">volume prune</span>
                    <span class="desc">Remove all unused volumes</span>
                </div>
            </div>

            <div class="section">
                <h2>Network Cleanup</h2>

                <div class="cmd-line">
                    <span class="cmd runtime">network ls</span>
                    <span class="desc">List networks</span>
                </div>
                <div class="cmd-line">
                    <span class="cmd runtime">network rm network-name</span>
                    <span class="desc">Remove specific network</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd runtime">network prune</span>
                    <span class="desc">Remove all unused networks</span>
                </div>
            </div>

            <div class="section">
                <h2>Complete System Cleanup</h2>

                <div class="cmd-line yellow">
                    <span class="cmd runtime">system prune</span>
                    <span class="desc">Remove stopped containers, unused networks, dangling images</span>
                </div>

                <div class="cmd-line red">
                    <span class="cmd runtime">system prune -a</span>
                    <span class="desc">Everything above + all unused images</span>
                </div>

                <div class="cmd-line red">
                    <span class="cmd runtime">system prune --volumes</span>
                    <span class="desc">Everything above + unused volumes (CAREFUL!)</span>
                </div>

                <h3>Full Nuclear Cleanup</h3>
                <div class="cmd-block"># Stop all containers
runtime stop $(runtime ps -aq)

# Remove all containers
runtime rm -a

# Remove all images
runtime rmi -a

# Remove all volumes
runtime volume prune -f

# Remove all networks (except default)
runtime network prune -f

# Full system cleanup
runtime system prune -a --volumes -f</div>

                <div class="note">The last command removes EVERYTHING. Use with caution!</div>
            </div>

            <div class="section">
                <h2>Cleanup Best Practices</h2>

                <div class="grid-2">
                    <div class="workflow-box">
                        <h4 style="color: #00ff88;">Daily Cleanup</h4>
                        <div class="cmd-block"># Remove stopped containers
runtime container prune -f

# Remove dangling images
runtime image prune -f</div>
                    </div>

                    <div class="workflow-box">
                        <h4 style="color: #ff408f;">Weekly Cleanup</h4>
                        <div class="cmd-block"># Remove unused images
runtime image prune -a

# Check disk usage
runtime system df</div>
                    </div>
                </div>

                <h3>Safe Cleanup Commands</h3>
                <div class="cmd-line green">
                    <span class="cmd runtime">container prune -f</span>
                    <span class="desc">Safe - only removes stopped</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd runtime">image prune -f</span>
                    <span class="desc">Safe - only removes dangling</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd runtime">image prune -a</span>
                    <span class="desc">Careful - removes all unused</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd runtime">system prune -a --volumes</span>
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
                    <div class="cmd-block">runtime pull nginx
runtime run -dit --name practice nginx
runtime ps</div>
                    <h4>Inside container:</h4>
                    <div class="cmd-block">ls -la /usr/share/nginx/html/
cat /etc/nginx/nginx.conf
ps aux
whoami
exit</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 3-4</span> Ubuntu container</h4>
                    <div class="cmd-block">runtime run -dit --name ubuntu-practice ubuntu
runtime exec -it ubuntu-practice bash</div>
                    <h4>Inside container:</h4>
                    <div class="cmd-block">apt update
apt install -y curl vim
curl --version
which curl
exit</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 5-7</span> Alpine (minimal)</h4>
                    <div class="cmd-block">runtime run -dit --name alpine-practice alpine
runtime exec -it alpine-practice sh</div>
                    <h4>Inside container:</h4>
                    <div class="cmd-block">apk add curl
curl -I https://example.com
exit</div>
                </div>

                <h3>Commands to Master</h3>
                <div class="cmd-line green">
                    <span class="cmd">runtime run -d</span>
                    <span class="desc">Detached</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">runtime run -it</span>
                    <span class="desc">Interactive</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">runtime exec -it</span>
                    <span class="desc">Enter running container</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd">runtime stop / runtime start</span>
                    <span class="desc">Stop and start</span>
                </div>
                <div class="cmd-line red">
                    <span class="cmd">runtime rm (-f)</span>
                    <span class="desc">Remove container</span>
                </div>
            </div>

            <div class="section">
                <h2>Week 2: Port Mapping & Networking</h2>
                <p class="goal">Goal: Access containers and understand networking</p>

                <div class="week-card">
                    <h4><span class="day">Days 1-2</span> Port mapping</h4>
                    <div class="cmd-block">runtime run -d --name web -p 8080:80 nginx
curl localhost:8080
runtime port web</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 3-4</span> Multiple ports</h4>
                    <div class="cmd-block">runtime run -d --name app \
  -p 3000:3000 \
  -p 9229:9229 \
  node:alpine

runtime logs app</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 5-6</span> Custom networks</h4>
                    <div class="cmd-block">runtime network create mynet
runtime run -d --name db \
  --network mynet \
  postgres

runtime run -dit --name app \
  --network mynet \
  alpine

runtime exec app ping -c 2 db</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Day 7</span> Inspect networking</h4>
                    <div class="cmd-block">runtime inspect web | grep -A 20 Networks
runtime network ls</div>
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

runtime run -d --name webdata \
  -v ~/container-data:/usr/share/nginx/html \
  nginx

echo "&lt;h1&gt;Hello from host&lt;/h1&gt;" &gt; ~/container-data/index.html

curl localhost:8080</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 3-4</span> Named volumes</h4>
                    <div class="cmd-block">runtime volume create mydata

runtime run -dit -v mydata:/data alpine

runtime exec alpine sh -c "echo 'data' &gt; /data/file.txt"

runtime rm -f alpine

runtime run -dit -v mydata:/data alpine

runtime exec alpine cat /data/file.txt
# Data preserved!</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 5-6</span> Database with volume</h4>
                    <div class="cmd-block">runtime run -d --name postgresdb \
  -v pgdata:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret \
  postgres

runtime exec -it postgresdb psql -U postgres</div>
                    <h4>Inside psql:</h4>
                    <div class="cmd-block">CREATE DATABASE testdb;
\l
\q</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Day 7</span> Backup and restore</h4>
                    <div class="cmd-block">runtime run --rm \
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
                    <div class="cmd-block">runtime build -t myalpine:v1 .
runtime run -it myalpine:v1</div>
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
                    <div class="cmd-block">runtime run -e MY_VAR=hello \
  alpine echo $MY_VAR

runtime run -d --name db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_DB=mydb \
  postgres

runtime exec db env | grep POSTGRES</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 3-4</span> .env file</h4>
                    <div class="cmd-block">cat &gt; .env &lt;&lt; 'EOF'
DB_PASSWORD=secret123
API_KEY=abc123
DEBUG=true
EOF

runtime run --env-file .env \
  alpine env</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Days 5-6</span> Config files via volumes</h4>
                    <div class="cmd-block">runtime run -v ~/nginx-conf:/etc/nginx/conf.d nginx</div>
                </div>
            </div>

            <div class="section">
                <h2>Week 6: Logs, Inspection & Troubleshooting</h2>
                <p class="goal">Goal: Debug and monitor containers</p>

                <div class="week-card">
                    <h4><span class="day">Basic logging</span></h4>
                    <div class="cmd-block">runtime logs webserver
runtime logs -f webserver
runtime logs --tail 20 webserver</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Inspection</span></h4>
                    <div class="cmd-block">runtime inspect webserver

runtime inspect --format '{{.NetworkSettings.IPAddress}}' webserver

runtime inspect --format '{{.Config.Image}}' webserver</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Resource usage</span></h4>
                    <div class="cmd-block">runtime stats webserver
runtime top webserver</div>
                </div>

                <h3>Troubleshooting Flow</h3>
                <div class="cmd-line yellow">
                    <span class="cmd">runtime ps</span>
                    <span class="desc">Is it running?</span>
                </div>
                <div class="cmd-line blue">
                    <span class="cmd">runtime port container</span>
                    <span class="desc">Check port mapping</span>
                </div>
                <div class="cmd-line green">
                    <span class="cmd">runtime logs container</span>
                    <span class="desc">Check logs</span>
                </div>
                <div class="cmd-line purple">
                    <span class="cmd">runtime inspect container</span>
                    <span class="desc">Deep inspection</span>
                </div>
                <div class="cmd-line yellow">
                    <span class="cmd">runtime exec -it container sh</span>
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
                <div class="cmd-block">runtime compose up -d
runtime compose down
runtime compose ps
runtime compose logs -f
runtime compose exec web sh
runtime compose restart
runtime compose build</div>
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
                    <div class="cmd-block">runtime run -d \
  --name limited \
  --memory="512m" \
  --cpus="0.5" \
  nginx</div>
                </div>

                <div class="week-card">
                    <h4><span class="day">Read-only containers</span></h4>
                    <div class="cmd-block">runtime run --read-only --name secured alpine sh</div>
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
    </div>

    <footer>
        <p>Practice <span>15-30 minutes daily</span> • Consistency beats intensity</p>
    </footer>

    <script>
        let currentRuntime = 'podman';

        function setRuntime(runtime) {
            currentRuntime = runtime;
            
            document.querySelectorAll('.runtime-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`.runtime-btn.${runtime}`).classList.add('active');

            document.querySelectorAll('.cmd').forEach(el => {
                if (el.classList.contains('runtime')) {
                    el.textContent = runtime;
                }
            });
        }

        function openTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }

        // Initialize
        setRuntime('podman');
    </script>
</body>
</html>
