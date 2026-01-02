import { PropsWithChildren } from '@sparkjs/spark'
import { Header } from '../components/header.tsx'
import RootLayout from './root_layout.tsx'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuContent,
  SidebarMenuLabel,
  SidebarMenuLink,
} from '../components/sidebar.tsx'
import { PackagesSwitcher } from '../components/packages_switcher.tsx'
import { DocumentationMenuCategory, DocumentationMenuPage } from '@sparkjs/sparkles/loaders'
import { DocumentationContext } from '../pages/doc_page.tsx'

export default function DocsLayout({ children }: PropsWithChildren) {
  const { documentation, documentations } = DocumentationContext.getOrFail()

  return (
    <RootLayout>
      <div className="grid docs-grid overflow-x-clip auto-cols-auto auto-rows-auto docs-grid min-h-(--docs-height)">
        <Header />
        <Sidebar>
          <SidebarHeader>
            <PackagesSwitcher documentations={documentations} documentation={documentation} />
          </SidebarHeader>
          <SidebarContent>
            {documentation.menu.map((category) => (
              <Category category={category} />
            ))}
          </SidebarContent>
        </Sidebar>
        {children}
      </div>
    </RootLayout>
  )
}

const Category = ({ category }: { category: DocumentationMenuCategory }) => {
  return (
    <SidebarMenu>
      {category.name && <SidebarMenuLabel>{category.name}</SidebarMenuLabel>}
      <SidebarMenuContent>
        {category.items.map((item) => (
          <Item item={item} />
        ))}
      </SidebarMenuContent>
    </SidebarMenu>
  )
}

function Item({ item }: { item: DocumentationMenuPage }) {
  return (
    <SidebarMenuLink up-follow up-target="#content" up-history href={item.href}>
      {item.icon && <i className={`hgi hgi-stroke hgi-${item.icon} text-lg`}></i>}
      {item.name}
    </SidebarMenuLink>
  )
}
