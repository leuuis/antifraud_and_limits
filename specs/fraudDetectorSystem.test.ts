import { describe, it, expect, beforeEach } from 'vitest';
import FraudDetectorSystem from '../fraudDetectorSystem';

describe('Fraud Detector System - Simulation', () => {
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
});
