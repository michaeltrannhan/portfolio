import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const INTRO_SEEN_KEY = "mt-intro-seen";

async function openFreshPortfolio(page: Page) {
  await page.addInitScript((key) => sessionStorage.removeItem(key), INTRO_SEEN_KEY);
  await page.goto("/");
  await expect(
    page.getByRole("dialog", { name: "Enter portfolio" })
  ).toBeVisible();
}

async function enterPortfolio(page: Page) {
  await page.getByRole("button", { name: /enter/i }).click();
  await expect(
    page.getByRole("dialog", { name: "Enter portfolio" })
  ).toBeHidden();
  await expect(page.locator("#main-content")).toBeFocused();
}

test("the first-visit intro is a real modal and owns focus", async ({ page }) => {
  await openFreshPortfolio(page);

  const intro = page.getByRole("dialog", { name: "Enter portfolio" });
  await expect(intro).toHaveAttribute("aria-modal", "true");
  await expect(page.getByRole("button", { name: /enter/i })).toBeFocused();
  await expect.poll(() => page.locator("body").evaluate((body) => body.style.overflow)).toBe("hidden");
});

test("returning visits use the short automatic reveal", async ({ page }) => {
  await page.addInitScript(
    (key) => sessionStorage.setItem(key, "1"),
    INTRO_SEEN_KEY
  );
  await page.goto("/");

  const welcome = page.getByText("Welcome back", { exact: true });
  await expect(welcome).toBeVisible();
  await expect(welcome).toBeHidden();
  await expect
    .poll(() => page.locator("body").evaluate((body) => body.style.overflow))
    .not.toBe("hidden");
  await expect(page.getByRole("heading", { name: "Nhan", level: 1 })).toBeVisible();
});

test("overlapping dialogs keep scroll locked until the final dialog closes", async ({
  page,
}) => {
  await openFreshPortfolio(page);

  await page.evaluate(() =>
    window.dispatchEvent(new Event("mt:open-command-palette"))
  );
  await expect(page.getByRole("dialog", { name: "Quick jump" })).toBeVisible();

  await page.getByRole("button", { name: /enter/i }).click({ force: true });
  await expect(
    page.getByRole("dialog", { name: "Enter portfolio" })
  ).toBeHidden();
  await expect
    .soft(
      page.locator("body").evaluate((body) => body.style.overflow),
      "the remaining command palette must retain the body lock"
    )
    .resolves.toBe("hidden");

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Quick jump" })).toBeHidden();
  await expect
    .soft(
      page.locator("body").evaluate((body) => body.style.overflow),
      "the last dialog must restore scrolling"
    )
    .resolves.not.toBe("hidden");
});

test("the jump palette returns focus to its trigger", async ({ page }) => {
  await openFreshPortfolio(page);
  await enterPortfolio(page);

  const trigger = page.getByRole("button", { name: "Open jump palette" });
  await trigger.click();
  await expect(page.getByLabel("Jump to section")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Quick jump" })).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("the intro restores the browser scroll-restoration policy", async ({
  page,
}) => {
  await page.addInitScript(() => {
    history.scrollRestoration = "auto";
  });
  await openFreshPortfolio(page);
  await expect.poll(() => page.evaluate(() => history.scrollRestoration)).toBe("manual");
  await enterPortfolio(page);
  await expect.poll(() => page.evaluate(() => history.scrollRestoration)).toBe("auto");
});

test("case studies are modal, focus-owned, and return focus", async ({ page }) => {
  await openFreshPortfolio(page);
  await enterPortfolio(page);
  await page.locator("#projects").scrollIntoViewIfNeeded();

  const trigger = page.getByRole("button", {
    name: /Case study Signal Desk Keyboard-first triage/i,
  });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Signal Desk" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(page.getByRole("button", { name: "Close case study" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("section navigation tracks programmatic scroll", async ({ page }) => {
  await openFreshPortfolio(page);
  await enterPortfolio(page);

  await page.locator("#tech").scrollIntoViewIfNeeded();
  await expect(
    page.locator('nav a[href="#tech"][aria-current="location"]')
  ).toHaveCount(2);

  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(
    page.locator('nav a[href="#projects"][aria-current="location"]')
  ).toHaveCount(2);
});

test("the home page has no runtime or hydration errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await openFreshPortfolio(page);
  await enterPortfolio(page);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);

  expect(errors).toEqual([]);
});

test("the dark system theme hydrates cleanly before entry", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => localStorage.removeItem("theme"));
  await openFreshPortfolio(page);

  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.waitForTimeout(250);
  expect(errors).toEqual([]);
});

test("the rendered home page has no serious accessibility violations", async ({
  page,
}) => {
  await openFreshPortfolio(page);
  await enterPortfolio(page);
  await page.waitForTimeout(250);

  const { violations } = await new AxeBuilder({ page }).analyze();
  const serious = violations
    .filter(({ impact }) => impact === "serious" || impact === "critical")
    .map(({ id, impact, nodes }) => ({
      id,
      impact,
      targets: nodes.map((node) => node.target.join(" ")),
    }));

  expect(serious).toEqual([]);
});

test("process-frame cards render their intended gradient surfaces", async ({
  page,
}) => {
  await openFreshPortfolio(page);
  await enterPortfolio(page);

  const cards = page
    .getByText("Process frames", { exact: true })
    .locator("xpath=ancestor::section[1]")
    .locator("article");
  await expect(cards).toHaveCount(4);

  const backgrounds = await cards.evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).backgroundImage)
  );
  expect(backgrounds).not.toContain("none");
});

test.describe("reduced motion", () => {
  test("hydrates cleanly and the intro exits immediately", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.emulateMedia({ reducedMotion: "reduce" });
    await openFreshPortfolio(page);
    await page.getByRole("button", { name: /enter/i }).click();
    await expect(
      page.getByRole("dialog", { name: "Enter portfolio" })
    ).toBeHidden({ timeout: 350 });
    await page.waitForTimeout(250);

    expect(errors).toEqual([]);
  });
});
