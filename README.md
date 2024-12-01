### Semplice Emulatore di CPU

---

## Riferimento al Linguaggio

| **Istruzione**   | **Descrizione**                                               |
|-------------------|---------------------------------------------------------------|
| `ADD Rn, Rm`     | Somma `Rn` e `Rm`, salva il risultato in `Rn`.                |
| `SUB Rn, Rm`     | Sottrae `Rm` da `Rn`, salva il risultato in `Rn`.             |
| `MUL Rn, Rm`     | Moltiplica `Rn` per `Rm`, salva il risultato in `Rn`.         |
| `DIV Rn, Rm`     | Divide `Rn` per `Rm` (divisione intera), salva il risultato.  |
| `CP Rn, value`   | Copia il valore in `Rn`.                                      |
| `LOAD Rn, addr`  | Carica il valore dalla RAM all'indirizzo `addr` in `Rn`.      |
| `STORE Rn, addr` | Salva il valore di `Rn` nella RAM all'indirizzo `addr`.       |
| `MAX Rn, Rm`  | Calcola il massimo tra `Rn` e `Rm` e salva il risultato in `Rn`.      |
| `MIN Rn, Rm` | Calcola il minimo tra `Rn` e `Rm` e salva il risultato in `Rn`.       |


---

### Programma di Esempio

```assembly
CP R0, 0x10      ; Copia 0x10 in R0
CP R1, 0x20      ; Copia 0x20 in R1
ADD R0, R1       ; Somma R0 e R1, salva il risultato in R0
STORE R0, 0x00   ; Salva il risultato all'indirizzo 0x00 della RAM
LOAD R2, 0x00    ; Carica il valore dall'indirizzo 0x00 in R2
SUB R2, R1       ; Sottrae R1 da R2
```

### Output Atteso
- Registri:
  - `R0`: 0x30
  - `R1`: 0x20
  - `R2`: 0x10
- RAM:
  - Indirizzo `0x00`: 0x30


