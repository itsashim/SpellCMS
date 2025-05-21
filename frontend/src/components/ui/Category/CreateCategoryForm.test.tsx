import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateCategoryForm from "./CreateCategoryForm";
import { BrowserRouter } from "react-router-dom";
import * as ReactRouter from "react-router";
import '@testing-library/jest-dom';
import { useCategories, useCategoriesMutation } from "../../../hooks/useCategories";

// Mock Hooks
jest.mock("../../../hooks/useCategories");
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

describe("CreateCategoryForm", () => {
  const mockMutate = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useCategories hook
    (useCategories as jest.Mock).mockReturnValue({
      data: [
        { id: "1", name: "Tech" },
        { id: "2", name: "Health" },
      ],
    });

    // Track calls with mockMutate and useCategoriesMutation
    (useCategoriesMutation as jest.Mock).mockReturnValue({
      mutate: (data: any, options: { onSuccess?: () => void }) => {
        mockMutate(data, options); // Using Data
        if (options?.onSuccess) {
          options.onSuccess();
        }
      },
    });

    // useNavigate Mock
    (ReactRouter.useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  function renderComponent() {
    return render(
      <BrowserRouter>
        <CreateCategoryForm />
      </BrowserRouter>
    );
  }

  test("renders form inputs and button", () => {
    renderComponent();

    expect(screen.getByLabelText(/category name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/category name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("shows validation error when name is empty", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    expect(mockMutate).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("calls mutate and navigates on valid submit", async () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/category name/i);
    fireEvent.change(input, { target: { value: "New Category" } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockMutate).toHaveBeenCalledWith(
        {
          id: "3",
          name: "New Category",
        },
        expect.any(Object)
      );
      expect(mockNavigate).toHaveBeenCalledWith("/category");
    });
  });

  test("submit button is disabled while submitting", async () => {

  });
});
