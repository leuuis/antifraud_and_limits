import { FraudDetectorSystemInterface } from './src/fraudDetectorSystemInterface';

export default class FraudDetectorSystem extends FraudDetectorSystemInterface {
    private userTransactions: Map<string, number[]>;

    constructor() {
        super();
        this.userTransactions = new Map<string, number[]>();
    }

    public addTransaction(userId: string, amount: number): number {
        if (!this.userTransactions.has(userId)) {
            this.userTransactions.set(userId, []);
        }
        this.userTransactions.get(userId)!.push(amount);
        return this.getBalance(userId);
    }

    public getBalance(userId: string): number {
        const transactions = this.userTransactions.get(userId);
        if (!transactions) return 0;
        return transactions.reduce((sum, current) => sum + current, 0);
    }

    // =========================================================================
    // RETO NIVEL 2: Implementa la Mediana (Leftmost integer si es par)
    // Complejidad esperada: O(n log n) por el ordenamiento interno
    // =========================================================================
    public getMedianSpent(userId: string): number | null {
        // TODO: Implementar
        return null;
    }

    // =========================================================================
    // RETO NIVEL 3: Obtener los 'k' usuarios que más dinero total han gastado
    // Si hay empate en montos, ordenar alfabéticamente por userId de menor a mayor.
    // Complejidad esperada: O(u log u) donde u es la cantidad de usuarios únicos
    // =========================================================================
    public getTopSpenders(k: number): string[] {
        // TODO: Implementar
        return [];
    }
}
