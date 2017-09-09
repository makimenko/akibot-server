export interface Wheel {

    stop(): void;
    forward(pctSpeed: number): void;
    backward(pctSpeed: number): void;

}