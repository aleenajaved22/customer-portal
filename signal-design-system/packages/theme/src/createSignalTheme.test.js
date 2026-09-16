import { createSignalTheme } from './createSignalTheme';

describe('@signal/theme createSignalTheme', () => {
  it('creates a theme with Signal brand and component overrides', () => {
    const theme = createSignalTheme();

    expect(theme.palette.primary.main).toBe('#2DA551');
    expect(theme.palette.background.default).toBe('#F5F5F6');
    expect(theme.shape.borderRadius).toBe(8);
    expect(theme.components.MuiButton).toBeDefined();
    expect(theme.components.MuiOutlinedInput).toBeDefined();
    expect(theme.components.MuiChip).toBeDefined();
    expect(theme.designSystem).toBeDefined();
  });
});
