# # Get information about all system drivers
# # $drivers = Get-PnpDevice | Select-Object DisplayName, Version, ProviderName
# # $drivers = Get-PnpDevice 
# # $drivers = driverquery /v 
$drivers = driverquery /v | Where-Object { $_ -like "*running*" }
# $drivers = driverquery /v /fo table | ForEach-Object { $_ -split '\s{2,}' } | Where-Object { $_ -like "*running*" } | Select-Object Driver, Version


# # $driverUpdates = Get-WindowsDriver -Online -All | Select-Object DisplayName, Version, ProviderName
# # Output the driver information as JSON
$drivers | ConvertTo-Json


# Get information about all system drivers with state "running"
# $drivers = driverquery /v | Where-Object { $_ -like "*running*" }
# $drivers = driverquery /v 

# # Extract version information using regex
# $versionPattern = '\s*Version\s*:\s*(\S*)'
# $driversWithVersion = $drivers | ForEach-Object {
#     if ($_ -match $versionPattern) {
#         [PSCustomObject]@{
#             DisplayName = $_
#             Version = $Matches[1]
#         }
#     }
# }

# # Output the filtered driver information with version as JSON
# $driversWithVersion | ConvertTo-Json
