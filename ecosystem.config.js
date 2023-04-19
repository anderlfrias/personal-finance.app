module.exports = {
    apps: [
        {
            name: "wallet-app",
            script: "serve",
            args: ["-s", "build"],
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};