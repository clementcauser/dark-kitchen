import { render } from "@testing-library/react";
import { Label } from "@/components/ui/label";

describe("label", () => {
  it("renders correctly", () => {
    const { container } = render(<Label>Label</Label>);

    expect(container).toMatchSnapshot();
  });
});
