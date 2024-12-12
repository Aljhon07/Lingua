# Lingua

### Backup and Restore Directus Data

Restore: Get-Content backup.sql | docker exec -i {container-name} mysql -u {} -p {} {db-name}
Backup: docker exec {container-name} sh -c 'exec mysqldump -u{} -p{} {db-name}' > backup.sql

docker build -t kaldi-vosk-small .
docker run -d -p 2700:2700 szrobyr935eagszm8x6nzb3u8
