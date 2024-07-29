const { Client } = require('pg');

class Database {
    constructor() {
        this.client = new Client({
            user: "avnadmin",
    password: "AVNS_gy3YH_zpqqdRpop6UB_",
    host: "job-portal-music-player.d.aivencloud.com",
    port: 15541,
    database: "job_board",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUUILnEO5lFHSShvLpNlrRp9pNnvQwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvN2Y5NDUxNDktZTQ4OC00OGNmLWFlYjMtNGIzOWRkZDc1
NTI5IFByb2plY3QgQ0EwHhcNMjQwNzIzMTQ0MDExWhcNMzQwNzIxMTQ0MDExWjA6
MTgwNgYDVQQDDC83Zjk0NTE0OS1lNDg4LTQ4Y2YtYWViMy00YjM5ZGRkNzU1Mjkg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALVHUKlc
2D9boPxOsnVyy/A8F55I0wy0Ztcb2PGZC+boaNsY9YMzE7zl8BWtGM4SxXqfIMMD
3NMz0rDmN6mQn4lEEXQCLbyFtmAGNjG3GzKzwAbXFqLI6j/+yzCYuvctuOSw4RNh
/9oUzNMu98hPCL/AB848I5UGPAdw3RktADKCtUX6EFToCp5dAVRl07qdVsT6Rq3t
RjeWNUS6Xe5vRj+V3pt0YPY9RL7qnmgju7no0P9BPJN/zNCuR18qMioc2t+j6347
gW5R+pUs4hmmTwLlWpNLL9vDCL5l9aF5FfvqxkoAV9BhS3Aj7IVkEhoQV9NCtMjk
1pMfFb6PU1UfmFx9LnAO9ANStGRJ+ZKN10tO6FTHwKZaGV/kAdXncoDQ4PZYGDKr
lIC7GWxEAkgERJgi8ELF7BzNWfRcqvdpfm2u+V71JSXrMGW8k3+6oZ+iXP2CH9+M
80uAw00uN3bNzLDGw5N5LtNx7BrpfgVwZstOTW24lo21SFsyxXB3NzR8iQIDAQAB
oz8wPTAdBgNVHQ4EFgQUwSqNO9YZau1vkPBPy+Jq/eWzpm0wDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAKXu4TsM2HfmTQQR
c1eEgOxiNwXADzzBdeJevyDNgYSp1BPji954Kq9XjUAG1OAyK7M3SHa01C1nLTiS
Ijh9xuXvIyioktNsFGO3KTJPzjkDrTi8xmePtT09IaqlE/wiVARIahWlI01m5Lak
p/DwNv0UypoNuZstDGzBSGmwVKCaLBRnVD1Li54p3/II4nIS0LTOKiqWKbheJlUu
kevIhLqWDrNPX9+AIkN6f1zp6lVuB8U+lcmksSut4+ySl0NYsYKVZax6iWIFau21
M97EJa5/cco0T4gW7CVOJuPQo+leraF2ArsqGykWhZt+w0LYwabffrHmC0YhdUq0
WpPWgyaLOKG4HTKVhU2tMZkEPPf0TweR+NddJGf+rS5YKqaaYgH65ptD/LQ4Re89
Uvv0ikU/73u40XOHFXDiYFHOkRMYMwm0dr96Npsl/5SJK3OHuwuqDvShzu2IZUcG
hlIU8G/XO35qCIDhUZHTXmuAOqAFCdK1KL58haq3BSc1JCOXNg==
-----END CERTIFICATE-----`,
    },
        });
        this.connected = false;
    }

    async connectToDatabase() {
        try {
            if (!this.connected) {
                await this.client.connect();
                // console.log('Connected to the database');
                this.connected = true;
            }
            return this.client;
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    async closeDatabaseConnection() {
        try {
            if (this.connected) {
                await this.client.end();
                console.log('Disconnected from the database');
                this.connected = false;
            }
        } catch (error) {
            console.error('Error closing the database connection:', error);
            throw error;
        }
    }
}

module.exports = Database;

