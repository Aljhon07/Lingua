# Lingua

### Backup and Restore Directus Data

Restore: Get-Content backup.sql | docker exec -i {container-name} mysql -u {} -p {} {db-name}
Backup: docker exec {container-name} sh -c 'exec mysqldump -u{} -p{} {db-name}' > backup.sql
