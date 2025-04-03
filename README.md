# Lingua

### Backup and Restore Directus Data

Restore: Get-Content backup.sql | docker exec -i {container-name} mysql -u {} -p {} {db-name}
Backup: docker exec {container-name} sh -c 'exec mysqldump -u{} -p{} {db-name}' > backup.sql

cat backup.sql | docker exec -i e157a33a722c mysql -uroot -prootpassword test

iconv -f UTF-16LE -t UTF-8 backup/backup_v2-bookings.sql -o backup_v2-bookings_utf8.sql

<!--  -->

Get-Content backup/backup_v2.sql | docker exec -i 47abdacc35fa mysql -uroot -prootpassword test
docker exec 47abdacc35fa sh -c 'exec mysqldump -uroot -prootpassword test' > backup/backup_v3.sql
