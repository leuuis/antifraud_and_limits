import { describe, it, expect, beforeEach } from 'vitest';
import FraudDetectorSystem from '../fraudDetectorSystem';

describe('Airbnb Fraud Detector System - CodeSignal Simulation', () => {
    let system: FraudDetectorSystem;

    beforeEach(() => {
        system = new FraudDetectorSystem();
    });

    it('Nivel 1: Debería registrar transacciones y retornar balances acumulados', () => {
        expect(system.addTransaction('user_A', 10)).toBe(10);
        expect(system.addTransaction('user_A', 50)).toBe(60);
        expect(system.addTransaction('user_B', 100)).toBe(100);
        expect(system.getBalance('user_A')).toBe(60);
        expect(system.getBalance('user_C')).toBe(0);
    });

    it('Nivel 2: Debería calcular la mediana con la regla especial (leftmost en pares)', () => {
        expect(system.getMedianSpent('user_X')).toBeNull();

        // Caso impar
        system.addTransaction('user_X', 50);
        system.addTransaction('user_X', 10);
        system.addTransaction('user_X', 100); // Ordenado: [10, 50, 100]
        expect(system.getMedianSpent('user_X')).toBe(50);

        // Caso par (Debe elegir el de la izquierda del centro)
        system.addTransaction('user_X', 40); // Ordenado: [10, 40, 50, 100] -> Centro: 40 y 50
        expect(system.getMedianSpent('user_X')).toBe(40); // Leftmost es 40
    });

    it('Nivel 3: Debería retornar el top K de spenders con desempate alfabético', () => {
        system.addTransaction('user_A', 50);
        system.addTransaction('user_B', 150);
        system.addTransaction('user_C', 50); // Empate en $50 entre user_A y user_C

        // Top 1 global
        expect(system.getTopSpenders(1)).toEqual(['user_B']);

        // Top 3 global (Validando el desempate alfabético de A antes de C)
        expect(system.getTopSpenders(3)).toEqual(['user_B', 'user_A', 'user_C']);
    });

    it('Nivel 4: Debería manejar ventanas de tiempo móviles (TTL de 1 minuto) y registrar transacciones con marcas de tiempo', () => {
        // CONFIGURACIÓN DE ESCENARIO:
        // t = 0ms: user_A gasta 100
        // t = 30,000ms (30s): user_B gasta 150
        // t = 60,000ms (1 min): user_A gasta 50
        // t = 70,000ms (1 min 10s): Se realiza una consulta global

        // 1. Registro inicial a los 0 milisegundos (Inicio del tiempo)
        // user_A es el único y líder con 100
        expect(system.addTransactionWithTime('user_A', 100, 0)).toBe(100);

        // 2. Registro a los 30 segundos (30,000ms)
        // user_B entra al sistema con 150. Sigue dentro de la ventana activa para todos.
        // user_B es el nuevo Top 1 global
        expect(system.addTransactionWithTime('user_B', 150, 30000)).toBe(150);
        expect(system.getTopSpendersAtTime(2, 30000)).toEqual(['user_B', 'user_A']);

        // 3. Registro al minuto exacto (60,000ms)
        // user_A hace una nueva transacción de 50.
        // En este instante exacto (t = 60,000), su primera transacción (t = 0) cumple exactamente 60,000ms de antigüedad.
        // Dependiendo de si el límite es estricto, esa primera transacción expira o está en el límite.
        // Su balance activo actual debe ser de 50 (o 150 si incluyera el límite). Según la regla estándar (edad <= 60000),
        // a los 60,000ms, la de t=0 sigue activa en el último suspiro: 100 + 50 = 150.
        expect(system.addTransactionWithTime('user_A', 50, 60000)).toBe(150);

        // 4. El caso de prueba crucial: Avance del tiempo a los 70 segundos (70,000ms)
        // Evaluamos el sistema 10 segundos después del último registro de user_A.
        // - Transacción de user_A a t=0 (Edad: 70,000ms) -> EXPIRADA (Mayor a 60,000ms)
        // - Transacción de user_B a t=30,000 (Edad: 40,000ms) -> ACTIVA (\$150)
        // - Transacción de user_A a t=60,000 (Edad: 10,000ms) -> ACTIVA (\$50)

        // Balances activos a los 70,000ms: user_B = 150, user_A = 50.
        // Por lo tanto, el Top 2 ordenado de mayor a menor debe ser obligatoriamente ['user_B', 'user_A']
        expect(system.getTopSpendersAtTime(2, 70000)).toEqual(['user_B', 'user_A']);

        // 5. Avance del tiempo a los 100 segundos (100,000ms)
        // - Transacción de user_B a t=30,000 (Edad: 70,000ms) -> EXPIRADA
        // - Transacción de user_A a t=60,000 (Edad: 40,000ms) -> ACTIVA (\$50)

        // Ahora el rey del gasto cambia drásticamente debido a la expiración del tiempo.
        // El único usuario con dinero activo es user_A (\$50). user_B tiene balance activo de 0.
        expect(system.getTopSpendersAtTime(2, 100000)).toEqual(['user_A']);
    });

});
