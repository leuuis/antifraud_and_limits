export abstract class FraudDetectorSystemInterface {
    abstract addTransaction(userId: string, amount: number): number;
    abstract getBalance(userId: string): number;
    abstract getMedianSpent(userId: string): number | null;
    abstract getTopSpenders(k: number): string[];
}
