import type { DepartmentId } from "./prototype-data";
import type { CSSProperties } from "react";

export type DepartmentLinePattern = "solid" | "double" | "dashed" | "dotted";

export type DepartmentTheme = {
  id: DepartmentId;
  department: string;
  lineName: string;
  colorName: string;
  hex: string;
  pattern: DepartmentLinePattern;
};

export type OwnerLineTheme = Omit<DepartmentTheme, "id"> & { id: "jeremy" };

export const departmentThemes: Record<DepartmentId, DepartmentTheme> = {
  workforce: { id: "workforce", department: "Workforce", lineName: "Amber Line", colorName: "Gold", hex: "#F2B705", pattern: "dashed" },
  sales: { id: "sales", department: "Sales", lineName: "Green Line", colorName: "Emerald", hex: "#168A3A", pattern: "solid" },
  marketing: { id: "marketing", department: "Marketing", lineName: "Magenta Line", colorName: "Magenta", hex: "#C2187A", pattern: "dotted" },
  operations: { id: "operations", department: "Operations", lineName: "Orange Line", colorName: "Burnt Orange", hex: "#D95F02", pattern: "double" },
  finance: { id: "finance", department: "Finance", lineName: "Blue Line", colorName: "Cobalt", hex: "#1F5EFF", pattern: "solid" },
  support: { id: "support", department: "Support", lineName: "Cyan Line", colorName: "Sky Cyan", hex: "#00A6D6", pattern: "dashed" },
  accounting: { id: "accounting", department: "Accounting", lineName: "Black Line", colorName: "Black", hex: "#111827", pattern: "double" },
  technology: { id: "technology", department: "Technology", lineName: "Violet Line", colorName: "Purple", hex: "#6A35C8", pattern: "dotted" },
  legal: { id: "legal", department: "Legal", lineName: "Pink Line", colorName: "Pink", hex: "#EC4899", pattern: "solid" },
};

export const ownerLineTheme: OwnerLineTheme = {
  id: "jeremy",
  department: "Jeremy",
  lineName: "Gray Line",
  colorName: "Slate",
  hex: "#6B7280",
  pattern: "solid",
};

const DEPARTMENT_ACTIVE_TINT = 0.14;
const DEPARTMENT_SUBTLE_TINT = 0.08;
const DEPARTMENT_BORDER_TINT = 0.33;
const DEPARTMENT_PANEL_TINT = 0.07;
const DEPARTMENT_RAIL_WIDTH = "4px";

export function getDepartmentTheme(id: DepartmentId) {
  return departmentThemes[id];
}

export function lineStroke(pattern: DepartmentLinePattern) {
  if (pattern === "dashed") return "10 8";
  if (pattern === "dotted") return "2 8";
  return undefined;
}

export function patternLabel(pattern: DepartmentLinePattern) {
  if (pattern === "double") return "double rail";
  return pattern;
}

export function hexAlpha(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function departmentSurfaceStyle(id: DepartmentId): CSSProperties {
  return { borderColor: getDepartmentTheme(id).hex };
}

export function departmentRailStyle(id: DepartmentId): CSSProperties {
  const theme = getDepartmentTheme(id);
  return {
    borderColor: theme.hex,
    boxShadow: `inset ${DEPARTMENT_RAIL_WIDTH} 0 0 ${theme.hex}`,
  };
}

export function departmentTextStyle(id: DepartmentId): CSSProperties {
  return { color: getDepartmentTheme(id).hex };
}

export function departmentBackgroundStyle(id: DepartmentId): CSSProperties {
  return { backgroundColor: getDepartmentTheme(id).hex };
}

export function ownerBackgroundStyle(): CSSProperties {
  return { backgroundColor: ownerLineTheme.hex };
}

export function departmentBadgeStyle(id: DepartmentId): CSSProperties {
  const theme = getDepartmentTheme(id);
  return {
    borderColor: theme.hex,
    color: theme.hex,
    backgroundColor: hexAlpha(theme.hex, DEPARTMENT_SUBTLE_TINT),
  };
}

export function departmentChipStyle(id: DepartmentId, selected: boolean): CSSProperties {
  const theme = getDepartmentTheme(id);
  if (selected) {
    return { backgroundColor: theme.hex, borderColor: theme.hex };
  }
  return { borderColor: hexAlpha(theme.hex, DEPARTMENT_BORDER_TINT) };
}

export function departmentPanelStyle(id: DepartmentId): CSSProperties {
  const theme = getDepartmentTheme(id);
  return {
    borderColor: hexAlpha(theme.hex, DEPARTMENT_BORDER_TINT),
    backgroundColor: hexAlpha(theme.hex, DEPARTMENT_PANEL_TINT),
  };
}

export function departmentNavItemStyle(id: DepartmentId, isActive: boolean): CSSProperties {
  const theme = getDepartmentTheme(id);
  return {
    borderLeftColor: theme.hex,
    backgroundColor: isActive ? hexAlpha(theme.hex, DEPARTMENT_ACTIVE_TINT) : undefined,
  };
}
