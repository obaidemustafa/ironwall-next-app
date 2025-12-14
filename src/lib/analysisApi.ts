/**
 * IronWall Analysis Service API Client
 *
 * This module provides functions to interact with the FastAPI analysis service.
 */

const ANALYSIS_API_URL =
    import.meta.env.VITE_ANALYSIS_API_URL || "http://localhost:5002";

// ============================================================================
// TYPES
// ============================================================================

export type FileType = "source" | "binary" | "any";
export type AnalysisStatus = "pending" | "processing" | "completed" | "failed";
export type SeverityLevel = "critical" | "high" | "medium" | "low" | "info";

export interface Finding {
    id: string;
    title: string;
    severity: SeverityLevel;
    description: string;
    file_path?: string;
    line_number?: number;
    code_snippet?: string;
    recommendation?: string;
}

export interface PreprocessingResponse {
    artifact_id: string;
    type: string;
    status: AnalysisStatus;
    file_count: number;
    languages_detected: string[];
    findings: Finding[];
    metadata: Record<string, unknown>;
    semgrep_results?: Record<string, unknown>;
    ast_summary?: Record<string, unknown>;
    cfg_results?: Record<string, unknown>;
    df_results?: Record<string, unknown>;
    taint_results?: Record<string, unknown>;
    source_files?: Array<Record<string, unknown>>;
    file_hashes?: Record<string, string>;
    error?: string;
}

export interface DockerfileResponse {
    dockerfile: string;
    filename: string;
    metadata: Record<string, unknown>;
    warnings: string[];
}

export interface ExploitResponse {
    exploit_code: string;
    filename: string;
    vulnerability_type: string;
    target_info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    warnings: string[];
}

export interface ValidationResult {
    success: boolean;
    status: string;
    execution_time: number;
    crash_address?: string;
    crash_type?: string;
    stdout: string;
    stderr: string;
    evidence: Record<string, unknown>;
}

export interface ValidationResponse {
    validation_id: string;
    status: AnalysisStatus;
    result?: ValidationResult;
    report?: string;
    error?: string;
}

export interface CampaignResponse {
    campaign_id: string;
    cve_id: string;
    status: AnalysisStatus;
    created_at: string;
    preprocessing?: PreprocessingResponse;
    dockerfile?: DockerfileResponse;
    exploit?: ExploitResponse;
    validation?: ValidationResponse;
}

export interface HealthResponse {
    status: string;
    service: string;
    version: string;
    timestamp: string;
}

export interface UploadResponse {
    file_id: string;
    filename: string;
    size: number;
    type: string;
    path: string;
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Check if the analysis service is healthy
 */
export async function checkHealth(): Promise<HealthResponse> {
    const response = await fetch(`${ANALYSIS_API_URL}/health`);
    if (!response.ok) {
        throw new Error("Analysis service is not available");
    }
    return response.json();
}

/**
 * Create a new analysis campaign
 */
export async function createCampaign(
    cveId: string,
    description: string,
    fileType: FileType = "any"
): Promise<CampaignResponse> {
    const response = await fetch(`${ANALYSIS_API_URL}/api/campaign/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cve_id: cveId,
            description: description,
            file_type: fileType,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to create campaign");
    }

    return response.json();
}

/**
 * Get campaign status and results
 */
export async function getCampaign(
    campaignId: string
): Promise<CampaignResponse> {
    const response = await fetch(
        `${ANALYSIS_API_URL}/api/campaign/${campaignId}`
    );

    if (!response.ok) {
        throw new Error("Campaign not found");
    }

    return response.json();
}

/**
 * Upload a file for analysis
 */
export async function uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${ANALYSIS_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to upload file");
    }

    return response.json();
}

/**
 * Preprocess an uploaded file
 */
export async function preprocessFile(
    file: File
): Promise<PreprocessingResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${ANALYSIS_API_URL}/api/preprocess`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to preprocess file");
    }

    return response.json();
}

/**
 * Generate a Dockerfile for the sandbox environment
 */
export async function generateDockerfile(
    cveId: string,
    targetName: string = "",
    language: string = "c",
    dependencies: string[] = [],
    buildInstructions: string = ""
): Promise<DockerfileResponse> {
    const response = await fetch(`${ANALYSIS_API_URL}/api/generate/dockerfile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cve_id: cveId,
            target_name: targetName,
            language: language,
            dependencies: dependencies,
            build_instructions: buildInstructions,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to generate Dockerfile");
    }

    return response.json();
}

/**
 * Generate exploit code
 */
export async function generateExploit(
    cveId: string,
    vulnerabilityType: string,
    targetInfo: Record<string, unknown> = {},
    preprocessingResult?: Record<string, unknown>
): Promise<ExploitResponse> {
    const response = await fetch(`${ANALYSIS_API_URL}/api/generate/exploit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cve_id: cveId,
            vulnerability_type: vulnerabilityType,
            target_info: targetInfo,
            preprocessing_result: preprocessingResult,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to generate exploit");
    }

    return response.json();
}

/**
 * Validate an exploit in the sandbox
 */
export async function validateExploit(
    exploitCode: string,
    dockerfile: string,
    timeoutSeconds: number = 60
): Promise<ValidationResponse> {
    const response = await fetch(`${ANALYSIS_API_URL}/api/validate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            exploit_code: exploitCode,
            dockerfile: dockerfile,
            timeout_seconds: timeoutSeconds,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to validate exploit");
    }

    return response.json();
}

/**
 * Download a Dockerfile for a specific CVE
 */
export async function downloadDockerfile(
    cveId: string,
    language: string = "c"
): Promise<string> {
    const response = await fetch(
        `${ANALYSIS_API_URL}/api/generate/dockerfile/${cveId}?language=${language}`
    );

    if (!response.ok) {
        throw new Error("Failed to download Dockerfile");
    }

    return response.text();
}
