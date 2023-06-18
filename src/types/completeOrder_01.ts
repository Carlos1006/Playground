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
    fillBarError: boolean;
    wheelError: boolean;
    motorError: boolean;
    fillErrormark: boolean;
    animationError: () => Promise<void>;
}