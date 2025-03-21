# Lingua

### Backup and Restore Directus Data

Restore: Get-Content backup.sql | docker exec -i {container-name} mysql -u {} -p {} {db-name}
Backup: docker exec {container-name} sh -c 'exec mysqldump -u{} -p{} {db-name}' > backup.sql
cat backup.sql | docker exec -i e157a33a722c mysql -uroot -prootpassword test

iconv -f UTF-16LE -t UTF-8 updated_backup_v4.sql -o fixed_backup_utf8.sql

docker build -t kaldi-vosk-small .
docker run -d -p 2700:2700 szrobyr935eagszm8x6nzb3u8
