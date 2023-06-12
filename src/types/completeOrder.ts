export interface AnimationTools {
    small: boolean;
    removeBorderRadius: boolean;
    disappear: boolean;
    overflow: boolean;
    packageBox: boolean;
    packageRight: boolean;
    truckFirstStage: boolean;
    loadBar: boolean;
    animationStart: () => Promise<void>;
    fillBar: boolean;
    truckLastStage: boolean;
    fillCheckmark: boolean;
    animationEnd: () => Promise<void>;
}