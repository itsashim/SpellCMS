import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'; // for extended matchers like toBeInTheDocument
import FilterComponent from "./FilterComponent";

describe("FilterComponent", () => {
  const mockSetSearchTerm = jest.fn();
  const mockSetStatusFilter = jest.fn();
  const mockSetCategoryFilter = jest.fn();

  const defaultProps = {
    searchTerm: "initial search",
    setSearchTerm: mockSetSearchTerm,
    statusFilter: "all",
    setStatusFilter: mockSetStatusFilter,
    categoryFilter: "all",
    setCategoryFilter: mockSetCategoryFilter,
    categories: ["Tech", "Lifestyle", "Health"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and selects with correct initial values", () => {
    render(<FilterComponent {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search blog...") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("initial search");

    // Select Status - first selected
    const selects = screen.getAllByRole("combobox");
    const statusSelect = selects[0] as HTMLSelectElement;
    expect(statusSelect).toBeInTheDocument();
    expect(statusSelect.value).toBe("all");

    // Select Category - second selected
    const categorySelect = selects[1] as HTMLSelectElement;
    expect(categorySelect).toBeInTheDocument();
    expect(categorySelect.value).toBe("all");

    // Options of Categoriy
    expect(screen.getByRole("option", { name: "Tech" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Lifestyle" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Health" })).toBeInTheDocument();
  });

  test("calls setSearchTerm when typing in input", () => {
    render(<FilterComponent {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search blog...");

    fireEvent.change(input, { target: { value: "new search" } });
    expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
    expect(mockSetSearchTerm).toHaveBeenCalledWith("new search");
  });

  test("calls setStatusFilter when changing status select", () => {
    render(<FilterComponent {...defaultProps} />);
    const selects = screen.getAllByRole("combobox");
    const statusSelect = selects[0];

    fireEvent.change(statusSelect, { target: { value: "draft" } });
    expect(mockSetStatusFilter).toHaveBeenCalledTimes(1);
    expect(mockSetStatusFilter).toHaveBeenCalledWith("draft");
  });

  test("calls setCategoryFilter when changing category select", () => {
    render(<FilterComponent {...defaultProps} />);
    const selects = screen.getAllByRole("combobox");
    const categorySelect = selects[1];

    fireEvent.change(categorySelect, { target: { value: "Tech" } });
    expect(mockSetCategoryFilter).toHaveBeenCalledTimes(1);
    expect(mockSetCategoryFilter).toHaveBeenCalledWith("Tech");
  });
});
