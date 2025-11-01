const WebSocket = require('ws');

// 创建 WebSocket 服务器，监听 9229 端口
const wss = new WebSocket.Server({ port: 9229 });

console.log('Chrome DevTools MCP 服务器已启动在端口 9229');

// 性能指标数据存储
const performanceMetrics = {
    timestamps: [],
    metrics: {}
};

wss.on('connection', function connection(ws) {
    console.log('新的客户端连接');

    // 处理接收到的消息
    ws.on('message', function incoming(message) {
        try {
            const data = JSON.parse(message);
            console.log('收到消息:', data);

            // 处理性能相关的命令
            if (data.method === 'Performance.enable') {
                performanceMetrics.timestamps.push(Date.now());
                response = {
                    id: data.id,
                    result: {}
                };
            } else if (data.method === 'Performance.getMetrics') {
                response = {
                    id: data.id,
                    result: {
                        metrics: [
                            { name: 'Timestamp', value: Date.now() },
                            { name: 'JSHeapUsedSize', value: process.memoryUsage().heapUsed },
                            { name: 'JSHeapTotalSize', value: process.memoryUsage().heapTotal }
                        ]
                    }
                };
            } else {
                // 默认响应
                response = {
                    id: data.id,
                    result: {},
                    type: 'response'
                };
            }

            ws.send(JSON.stringify(response));
        } catch (error) {
            console.error('处理消息时出错:', error);
        }
    });

    ws.on('close', () => {
        console.log('客户端断开连接');
    });
});