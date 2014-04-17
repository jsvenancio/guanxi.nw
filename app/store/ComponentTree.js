/**
 * Created with IntelliJ IDEA.
 * User: Scott
 * Date: 4/15/14
 * Time: 8:20 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Guanxi.store.ComponentTree', {
    extend: 'Ext.data.TreeStore',

    root: {
        expanded: true,
        children: [
            {
                text: 'Audio',
                expanded: false,
                children: [
                    {
                        id: 'Audio',
                        text: "Card Intel 5 Series/3400 Series High Definition Audio driver: snd_hda_intel Sound: Advanced Linux Sound Architecture v: k3.11.0-19-generic",
                        leaf: true
                    }
                ]
            },
            {
                text: 'CPU',
                expanded: false,
                children: [
                    {
                        id: 'CPU',
                        text: "Quad core Intel Core i7 CPU 860 (-HT-MCP-) cache: 8192 KB Clock Speeds: 1: 1197 MHz 2: 1197 MHz 3: 1197 MHz 4: 1197 MHz 5: 1197 MHz 6: 1197 MHz 7: 1197 MHz 8: 1197 MHz",
                        leaf: true
                    }
                ]
            },
            {
                text: 'Drives',
                expanded: false,
                children: [
                    {
                        id: 'Drives',
                        text: "HDD Total Size: 3064.6GB (67.2% used) ID-1: /dev/sda model: WDC_WD1001FALS size: 1000.2GB ID-2: /dev/sdb model: WDC_WD2001FASS size: 2000.4GB ID-3: /dev/sdc model: Corsair_CMFSSD size: 64.0GB",
                        leaf: true
                    }
                ]
            },
            {
                text: 'Graphics',
                expanded: false,
                children: [
                    {
                        id: 'Graphics',
                        text: "Card-1: NVIDIA G96 [GeForce 9500 GT] Card-2: NVIDIA G96 [GeForce 9400 GT] Display Server: X.org 1.14.5 drivers: nvidia,nouveau (unloaded: vesa) FAILED: fbdev Resolution: 237x34",
                        leaf: true
                    }
                ]
            },
            {
                text: 'Info',
                expanded: false,
                children: [
                    {
                        id: 'Info',
                        text: "Processes: 375 Uptime: 4 days Memory: 12350.6/16044.8MB Init: Upstart runlevel: 2 Client: Shell (bash) inxi: 2.1.20",
                        leaf: true
                    }
                ]
            },
            {
                text: 'Machine',
                expanded: false,
                children: [
                    {
                        id: 'Machine',
                        text: "No /sys/class/dmi, using dmidecode: you must be root to run dmidecode",
                        leaf: true
                    }
                ]
            },
            {
                text: 'Network',
                expanded: false,
                children: [
                    {
                        id: 'Network',
                        text: "Card-1: Realtek RTL8111/8168/8411 PCI Express Gigabit Ethernet Controller driver: r8168 IF: eth1 state: down mac: 00:24:1d:7f:6e:cd Card-2: Realtek RTL8111/8168/8411 PCI Express Gigabit Ethernet Controller driver: r8168 IF: eth0 state: up speed: 1000 Mbps duplex: full mac: 00:24:1d:7f:6e:cb",
                        leaf: true
                    }
                ]
            },
            {
                text: 'Partition',
                expanded: false,
                children: [
                    {
                        id: 'Partition',
                        text: "ID-1: / size: 59G used: 51G (91%) fs: ext4 dev: /dev/sdc1 ID-2: swap-1 size: 8.08GB used: 0.00GB (0%) fs: swap dev: /dev/sdb10",
                        leaf: true
                    }
                ]
            },
            {
                text: 'RAID',
                expanded: false,
                children: [
                    {
                        id: 'RAID',
                        text: "No RAID devices: /proc/mdstat, md_mod kernel module present",
                        leaf: true
                    }
                ]
            },
            {
                text: 'Resuming in non X mode',
                expanded: false,
                children: [
                    {
                        id: 'Resuming in non X mode',
                        text: "glxinfo not found. For package install advice run: inxi --recommends",
                        leaf: true
                    }
                ]
            },
            {
                text: 'Sensors',
                expanded: false,
                children: [
                    {
                        id: 'Sensors',
                        text: "None detected - is lm-sensors installed and configured?",
                        leaf: true
                    }
                ]
            },
            {
                text: 'System',
                expanded: false,
                children: [
                    {
                        id: 'System',
                        text: "Host: xu-80 Kernel: 3.11.0-19-generic x86_64 (64 bit) Desktop: Xfce 4.10.2 Distro: Ubuntu 13.10 saucy",
                        leaf: true
                    }
                ]
            }
        ]
    }
});