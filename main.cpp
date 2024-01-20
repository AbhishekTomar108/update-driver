#include <iostream>
#include <Windows.h>
#include <SetupAPI.h>

#pragma comment(lib, "setupapi.lib")

void EnumerateDrivers() {
    HDEVINFO deviceInfoSet = SetupDiGetClassDevs(NULL, 0, 0, DIGCF_PRESENT | DIGCF_ALLCLASSES);

    if (deviceInfoSet == INVALID_HANDLE_VALUE) {
        std::cerr << "SetupDiGetClassDevs failed" << std::endl;
        return;
    }

    SP_DEVINFO_DATA deviceInfoData;
    deviceInfoData.cbSize = sizeof(SP_DEVINFO_DATA);

    for (DWORD index = 0; SetupDiEnumDeviceInfo(deviceInfoSet, index, &deviceInfoData); ++index) {
        TCHAR deviceName[MAX_PATH];
        if (SetupDiGetDeviceRegistryProperty(deviceInfoSet, &deviceInfoData, SPDRP_DEVICEDESC, NULL,
                                            reinterpret_cast<PBYTE>(deviceName), sizeof(deviceName), NULL)) {
            std::wcout << L"Device Name: " << deviceName << std::endl;
        }
    }

    if (!SetupDiDestroyDeviceInfoList(deviceInfoSet)) {
        std::cerr << "SetupDiDestroyDeviceInfoList failed" << std::endl;
    }
}

int main() {
    EnumerateDrivers();
    return 0;
}
