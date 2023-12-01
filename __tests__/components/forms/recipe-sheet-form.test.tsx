import RecipeSheetForm from "@/components/forms/recipe-sheet";
import { render } from "@testing-library/react";

describe("recipe-sheet-form", () => {
  it("should render correctly", () => {
    const { container } = render(
      <RecipeSheetForm onSubmitSuccess={() => ({})} />
    );

    expect(container).toMatchSnapshot("recipe-sheet-form");
  });
});
