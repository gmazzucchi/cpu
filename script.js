const N_REGISTERS = 8
const RAM_SIZE = 16

let registers = new Array(N_REGISTERS).fill(0);
let ram = new Array(RAM_SIZE);
ram = [3, 16, 14, 23, 15, 2, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0]

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
        const reg = parseInt(v1.slice(1), 10);
        if (reg >= 0 && reg < registers.length) {
            return registers[reg];
        }
    } else {
        return parseInt(v1, 10);
    }
    return NaN;
}

function getRegisterNumber(r1) {
    if (!r1.startsWith('R') && !r1.startsWith('r')) {
        return NaN;
    }
    const reg = parseInt(r1.slice(1), 10);
    if (reg >= 0 && reg < N_REGISTERS) {
        return reg;
    }
    return NaN;
}

function getMemoryNumber(m1) {
    if (!m1.startsWith('M') && !m1.startsWith('m')) {
        return NaN;
    }
    const mem = parseInt(m1.slice(1), 10);
    if (mem >= 0 && mem < RAM_SIZE) {
        return mem;
    }
    return NaN;
}

function runCode() {
    const code = document.getElementById('code').value.split('\n');
    let output = '';

    for (let lineIndex = 0; lineIndex < code.length; lineIndex++) {
        const line = code[lineIndex];
        
        let [cmd, ...args] = line.split(' ');
        cmd = cmd.toLowerCase();
        if (args.length != 2) {
            output += `\nErrore alla linea ${lineIndex + 1} durante il comando "${line}":\nservono esattamente 3 operandi`;
            document.getElementById('output').textContent = output;
            return;
        }

        if (cmd === 'cp' || cmd === 'add' || cmd === 'sub' || cmd === 'mul' || cmd === 'div' || cmd == 'max' || cmd == 'min') {
            a0 = args[0];
            a1 = args[1];
            const r = getRegisterNumber(a0);
            const v = getValue(a1);
            if (isNaN(r)) {
                output += `\nErrore alla linea ${lineIndex + 1} durante il comando "${line}":\nil registro "${a0}" non esiste`;
                document.getElementById('output').textContent = output;
                return;
            }
            if (isNaN(v)) {
                output += `\nErrore alla linea ${lineIndex + 1} durante il comando "${line}":\nvalore "${a1}" non valido`;
                document.getElementById('output').textContent = output;
                return;
            }
            switch (cmd) {
                case 'cp':  registers[r] = Max.max(Max.floor(v), 0); break;
                case 'add': registers[r] += v; break;
                case 'sub': registers[r] = Math.max(registers[r] - v, 0); break;
                case 'mul': registers[r] *= v; break;
                case 'div': registers[r] = Math.floor(registers[r], v); break;
                case 'max': registers[r] = Math.max(registers[r], v); break;
                case 'min': registers[r] = Math.min(registers[r], v); break;
                default: break;
            }
        } else if (cmd === 'load') {
            const reg = getRegisterNumber(args[0]);
            const address = getMemoryNumber(args[1]);
            if (isNaN(reg)) {
                output += `\nErrore alla linea ${lineIndex + 1} durante il comando "${line}":\nil registro "${args[0]}" non esiste`;
                document.getElementById('output').textContent = output;
                return;
            }
            if (isNaN(address)) {
                output += `\nErrore alla linea ${lineIndex + 1} durante il comando "${line}":\nl'indirizzo di memoria "${args[1]}" non esiste`;
                document.getElementById('output').textContent = output;
                return;
            }
            registers[reg] = ram[address];
        } else if (cmd === 'store') {
            const reg = getRegisterNumber(args[0]);
            const address = getMemoryNumber(args[1]);
            if (isNaN(reg)) {
                output += `\nErrore alla linea ${lineIndex + 1} durante il comando "${line}":\nil registro "${args[0]}" non esiste`;
                document.getElementById('output').textContent = output;
                return;
            }
            if (isNaN(address)) {
                output += `\nErrore alla linea ${lineIndex + 1} durante il comando "${line}":\nl'indirizzo di memoria "${args[1]}" non esiste`;
                document.getElementById('output').textContent = output;
                return;
            }
            ram[address] = registers[reg];
        } else {
            output += `Istruzione sconosciuta: ${cmd}\n`;
            document.getElementById('output').textContent = output;
            return;
        }

        output += `Eseguito: ${line}\n`;
        updateMemory();
    }

    document.getElementById('output').textContent = output;
}

updateMemory();
