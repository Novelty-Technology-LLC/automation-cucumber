const Client = require("ssh2-sftp-client");

function registerSftpTasks(on) {
  on("task", {
    async uploadToSftp({ localPath, remotePath, sftpConfig }) {
      const sftp = new Client();

      try {
        await sftp.connect(sftpConfig);
        await sftp.put(localPath, remotePath);
        await sftp.end();
        return "uploaded";
      } catch (err) {
        console.error("SFTP Upload Error:", err);
        throw err;
      }
    },
  });
}

module.exports = registerSftpTasks;