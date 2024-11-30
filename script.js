const N_REGISTERS = 8
const RAM_SIZE = 16

let registers = new Array(N_REGISTERS).fill(0);
let ram = new Array(RAM_SIZE);
ram = [115, 142, 140, 10, 167, 25, 143, 196, 100, 65, 8, 125, 144, 131, 59]

function updateMemory() {
    for (let i = 0; i < registers.length; i++) {
        document.getElementById(`r${i}`).textContent = `R${i}: ${registers[i]}`;
    }
    for (let i = 0; i < ram.length; i++) {
        document.getElementById(`m${i}`).textContent = `M${i}: ${ram[i]}`;
    }
}

function getValue(v1) {
    if (v1.startsWith('R') || v1.startsWith('r')) {
        const reg = parseInt(v1.substring(1), 10);
        if (reg >= 0 && reg < registers.length) {
            return registers[reg];
        }
    } else {
        return parseInt(v1, 10);
    }
    return NaN;
}

function getRegisterNumber(r1) {
    const reg = parseInt(r1.substring(1), 10);
    if (reg >= 0 && reg < registers.length) {
        return reg;
    }
    return NaN;
}

function getMemoryNumber(m1) {
    const mem = parseInt(m1.substring(1), 10);
    if (mem >= 0 && mem < ram.length) {
        return mem;
    }
    return NaN;
}

function runCode() {
    const code = document.getElementById('code').value.split('\n');
    let output = '';
    let lineIndex = 1;

    code.forEach(line => {
        const [cmd, ...args] = line.split(' ');

        if (cmd == 'cp' || cmd == 'add' || cmd == 'sub' || cmd == 'mul' || cmd == 'div') {
            a0 = args[0]
            a1 = args[1]
            const r = getRegisterNumber(a0)
            const v = getValue(a1)
            if (r == NaN) {
                output += `Errore alla linea ${lineIndex}\ndurante il comando ${line}:\n il registro ${a0} non esiste`;
                return;
            }
            if (v == NaN) {
                output += `Errore alla linea ${lineIndex}\ndurante il comando ${line}:\n valore ${a1} non valido`;
                return;
            }
            switch (cmd) {
                case 'cp':  registers[r] =  v; break;
                case 'add': registers[r] += v; break;
                case 'sub': registers[r] -= v; break;
                case 'mul': registers[r] *= v; break;
                case 'div': registers[r] /= v; break;
                default: break;
            }
        } else if (cmd === 'load') {
            const reg = getRegisterNumber(args[0]);
            const address = getMemoryNumber(args[1]);
            if (reg == NaN) {
                output += `Errore alla linea ${lineIndex}\ndurante il comando ${line}:\n il registro ${args[0]} non esiste`;
                return;
            }
            if (address == NaN) {
                output += `Errore alla linea ${lineIndex}\ndurante il comando ${line}:\n l'indirizzo di memoria ${args[1]} non esiste`;
                return;
            }
            registers[reg] = ram[address];
        } else if (cmd === 'store') {
            const reg = getRegisterNumber(args[0]);
            const address = getMemoryNumber(args[1]);
            if (reg == NaN) {
                output += `Errore alla linea ${lineIndex}\ndurante il comando ${line}:\n il registro ${args[0]} non esiste`;
                return;
            }
            if (address == NaN) {
                output += `Errore alla linea ${lineIndex}\ndurante il comando ${line}:\n l'indirizzo di memoria ${args[1]} non esiste`;
                return;
            }
            ram[address] = registers[reg];
        } else {
            output += `Istruzione sconosciuta: ${cmd}\n`;
            return;
        }

        // output += `Eseguito: ${line}\n`;
        updateMemory();
        document.getElementById('output').textContent = output;
        lineIndex += 1;
    });
}

updateMemory();
