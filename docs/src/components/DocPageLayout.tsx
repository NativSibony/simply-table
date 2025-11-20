import { type ReactNode } from 'react';

interface DocPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  tableOfContents?: { id: string; title: string }[];
  nextSteps?: { href: string; title: string; primary?: boolean }[];
  notice?: {
    type: 'info' | 'warning' | 'success';
    title: string;
    content: string;
  };
}

export function DocPageLayout({
  title,
  description,
  children,
  tableOfContents,
  nextSteps,
  notice,
}: DocPageLayoutProps) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      {/* Notice */}
      {notice && <Notice {...notice} />}

      {/* Table of Contents */}
      {tableOfContents && tableOfContents.length > 0 && (
        <nav className="p-4 bg-muted/50 rounded-lg border">
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">
            On This Page
          </h2>
          <ul className="space-y-2 text-sm">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-primary hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Main Content */}
      {children}

      {/* Next Steps */}
      {nextSteps && nextSteps.length > 0 && (
        <section className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Next Steps</h2>
          <p className="text-muted-foreground mb-4">
            Continue exploring more features and capabilities:
          </p>
          <div className="flex flex-wrap gap-3">
            {nextSteps.map((step) => (
              <a
                key={step.href}
                href={step.href}
                className={
                  step.primary
                    ? 'px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'
                    : 'px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors'
                }
              >
                {step.title}
                {step.primary && ' →'}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

interface NoticeProps {
  type: 'info' | 'warning' | 'success';
  title: string;
  content: string;
}

function Notice({ type, title, content }: NoticeProps) {
  const styles = {
    info: {
      container: 'bg-blue-50 dark:bg-blue-950 border-blue-500',
      title: 'text-blue-900 dark:text-blue-100',
      content: 'text-blue-800 dark:text-blue-200',
      icon: 'ℹ️',
    },
    warning: {
      container: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-500',
      title: 'text-yellow-900 dark:text-yellow-100',
      content: 'text-yellow-800 dark:text-yellow-200',
      icon: '⚠️',
    },
    success: {
      container: 'bg-green-50 dark:bg-green-950 border-green-500',
      title: 'text-green-900 dark:text-green-100',
      content: 'text-green-800 dark:text-green-200',
      icon: '✓',
    },
  };

  const style = styles[type];

  return (
    <div className={`p-6 ${style.container} border-l-4 rounded-r-lg`}>
      <h3 className={`font-semibold ${style.title} mb-2`}>
        {style.icon} {title}
      </h3>
      <div
        className={`text-sm ${style.content}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} className="space-y-4 scroll-mt-20">
      <div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}