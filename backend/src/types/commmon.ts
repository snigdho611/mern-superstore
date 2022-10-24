export interface SuccessResponse {
    success: true;
    message: string;
    results: any[];
}

export interface SuccessProps {
    message: string;
    data?: any;
}

export interface FailureResponse {
    success: false;
    message: string;
    errors: any[];
}

export interface FailureProps {
    message: string;
    error?: [];
}