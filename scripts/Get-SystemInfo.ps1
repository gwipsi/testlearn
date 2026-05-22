$ScriptName = "Get-SystemInfo"
$ScriptVersion = "1.0.1"
$Script:Username = if (-not $env:USERNAME -or $env:USERNAME -eq "") { "UNKNOWN" } elseif ($env:USERNAME -match '\$$') { "SYSTEM" } else { $env:USERNAME }
$LogDir = Join-Path -Path $PSScriptRoot -ChildPath "..\Logs"
$LogDatei = Join-Path -Path $LogDir -ChildPath "$($ScriptName)$($ScriptVersion)$($Script:Username).log"

$CHECK_PASSED = 0
$CHECK_FAILED = 1001

function Write-Log {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Message,

        [ValidatePattern("^(Info|Wichtig|Warnung|Fehler|Erfolg|Debug)$")]
        [string]$Typ = "Info"
    )

    if (-not (Test-Path -Path $LogDir)) {
        New-Item -Path $LogDir -ItemType Directory -Force | Out-Null
    }

    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $Line = "$($Timestamp) [$($Typ)] $($Message)"

    Write-Host $Line
    Add-Content -Path $LogDatei -Value $Line -Encoding UTF8
}

function Get-OperatingSystemInfo {
    $OperatingSystem = Get-WmiObject -Class Win32_OperatingSystem

    return [PSCustomObject]@{
        ComputerName = $env:COMPUTERNAME
        Caption = $OperatingSystem.Caption
        Version = $OperatingSystem.Version
        BuildNumber = $OperatingSystem.BuildNumber
    }
}

function Get-ScriptRuntimeInfo {
    return [PSCustomObject]@{
        ScriptName = $ScriptName
        ScriptVersion = $ScriptVersion
        UserName = $Script:Username
        PowerShellVersion = $PSVersionTable.PSVersion.ToString()
    }
}

function Write-SystemInfo {
    param(
        [Parameter(Mandatory = $true)]
        [pscustomobject]$SystemInfo
    )

    Write-Log -Message "Computername: $($SystemInfo.ComputerName)" -Typ "Info"
    Write-Log -Message "Betriebssystem: $($SystemInfo.Caption)" -Typ "Info"
    Write-Log -Message "Version: $($SystemInfo.Version)" -Typ "Info"
    Write-Log -Message "Build: $($SystemInfo.BuildNumber)" -Typ "Info"
}

function Write-ScriptRuntimeInfo {
    param(
        [Parameter(Mandatory = $true)]
        [pscustomobject]$RuntimeInfo
    )

    Write-Log -Message "Skript: $($RuntimeInfo.ScriptName)" -Typ "Info"
    Write-Log -Message "Skriptversion: $($RuntimeInfo.ScriptVersion)" -Typ "Info"
    Write-Log -Message "Ausfuehrender Benutzer: $($RuntimeInfo.UserName)" -Typ "Info"
    Write-Log -Message "PowerShell-Version: $($RuntimeInfo.PowerShellVersion)" -Typ "Info"
}

function Invoke-Main {
    Write-Log -Message "Start $($ScriptName) $($ScriptVersion)" -Typ "Info"

    $RuntimeInfo = Get-ScriptRuntimeInfo
    Write-ScriptRuntimeInfo -RuntimeInfo $RuntimeInfo

    $SystemInfo = Get-OperatingSystemInfo
    Write-SystemInfo -SystemInfo $SystemInfo

    Write-Log -Message "Systeminformationen erfolgreich ermittelt" -Typ "Erfolg"
    Write-Log -Message "Exit $($CHECK_PASSED)" -Typ "Info"
}

try {
    Invoke-Main
}
catch {
    Write-Log -Message "Fehler: $($_.Exception.Message)" -Typ "Fehler"
    Write-Log -Message "Exit $($CHECK_FAILED)" -Typ "Info"
}
