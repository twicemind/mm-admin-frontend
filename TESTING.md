# Testing Guide

This document describes the testing infrastructure for MM Admin Frontend.

## Test Framework

The project uses:
- **Jasmine** - Testing framework
- **Karma** - Test runner
- **ChromeHeadless** - Browser for CI/CD

## Running Tests

### Local Development

```bash
# Run tests with watch mode
npm test

# Run tests once with coverage
npm run test:coverage

# Run tests in CI mode (headless)
npm run test:ci
```

### Test Coverage

Coverage reports are generated in the `coverage/` directory and include:
- HTML report: `coverage/mm-admin-frontend/index.html`
- LCOV report: `coverage/mm-admin-frontend/lcov.info`
- Text summary in console

**Coverage Thresholds:**
- Statements: 60%
- Branches: 50%
- Functions: 60%
- Lines: 60%

## Test Structure

```
src/
├── app/
│   ├── app.component.spec.ts
│   ├── core/
│   │   └── layout/
│   │       ├── header/
│   │       │   └── header.component.spec.ts
│   │       └── sidebar/
│   │           └── sidebar.component.spec.ts
│   └── features/
│       ├── dashboard/
│       │   └── dashboard.component.spec.ts
│       └── plugins/
│           └── plugins-overview/
│               └── plugins-overview.component.spec.ts
└── test.ts
```

## Writing Tests

### Component Test Example

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent, TranslateModule.forRoot()],
      providers: [provideAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## CI/CD Integration

### GitHub Actions

Tests run automatically on:
- Every push to `main`, `master`, or `develop` branches
- Every pull request

The workflow:
1. **Install dependencies** - `npm ci`
2. **Run linter** - `npm run lint`
3. **Run tests** - `npm run test:ci`
4. **Upload coverage** - To Codecov
5. **Build application** - `npm run build:prod`

### Test Workflow

See [`.github/workflows/test.yml`](.github/workflows/test.yml) for the complete test workflow.

### Release Workflow

The release workflow runs tests before creating releases:
1. **Run tests** - All tests must pass
2. **Build application** - Production build
3. **Create release** - Only if tests pass
4. **Build container** - Docker image build

See [`.github/workflows/release.yml`](.github/workflows/release.yml) for the complete release workflow.

## Test Utilities

### Providers for Testing

```typescript
// Router
provideRouter([])

// Animations
provideAnimations()

// HTTP Client
provideHttpClient()

// Translation
TranslateModule.forRoot()
```

## Debugging Tests

### Run tests in browser

```bash
npm test
```

This opens the Karma test runner in your browser where you can:
- See test results in real-time
- Debug tests in browser DevTools
- Re-run specific tests

### Run tests in headless mode

```bash
npm run test:ci
```

This is useful for CI/CD and quick local verification.

## Best Practices

1. **Test file naming**: `*.spec.ts` files should be next to the component they test
2. **Test isolation**: Each test should be independent
3. **Descriptive names**: Use clear `describe` and `it` blocks
4. **Coverage goals**: Aim for 80%+ coverage on critical paths
5. **Mock dependencies**: Use spies and mocks for external dependencies
6. **Test user interactions**: Test how components respond to user actions
7. **Accessibility**: Test keyboard navigation and screen reader support

## Future Enhancements

- [ ] Add E2E tests with Playwright
- [ ] Visual regression testing
- [ ] Performance benchmarks
- [ ] Accessibility testing with axe-core
- [ ] Increase coverage thresholds to 80%
