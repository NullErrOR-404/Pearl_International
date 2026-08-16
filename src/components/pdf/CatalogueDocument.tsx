import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register fonts if needed (using default for now)

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  coverPage: {
    backgroundColor: '#0F172A', // brand-navy
    padding: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  coverLogo: {
    width: 200,
    marginBottom: 40,
  },
  coverTitle: {
    fontSize: 32,
    color: '#D4AF37', // brand-gold
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  coverSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 1.5,
    paddingHorizontal: 40,
  },
  coverContactBox: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 'auto',
  },
  coverContactText: {
    color: '#ffffff',
    fontSize: 12,
    marginBottom: 8,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#D4AF37',
    paddingBottom: 15,
    marginBottom: 30,
  },
  headerLogo: {
    width: 120,
  },
  headerCategory: {
    fontSize: 24,
    color: '#0F172A',
    fontWeight: 'bold',
  },
  productsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  productCard: {
    width: '47%',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#F8FAFC',
  },
  productImage: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
    borderRadius: 4,
    marginBottom: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 10,
    color: '#D4AF37',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  productDesc: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#94A3B8',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  },
});

interface Settings {
  company_name: string;
  tag_line: string;
  primary_phone: string;
  primary_email: string;
  office_address: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: {
    name: string;
  };
}

interface CatalogueDocumentProps {
  settings: Settings;
  products: Product[];
  categoryName?: string;
  baseUrl: string; // to resolve images properly
}

export const CatalogueDocument = ({ settings, products, categoryName, baseUrl }: CatalogueDocumentProps) => {
  // Ensure image URLs are absolute for react-pdf
  const getAbsoluteUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Image src={getAbsoluteUrl('/footer-logo.png')} style={styles.coverLogo} />
        
        <Text style={styles.coverTitle}>
          {categoryName ? `${categoryName} Catalogue` : 'Complete Products Catalogue'}
        </Text>
        
        <Text style={styles.coverSubtitle}>
          {settings.tag_line || "Premium agricultural export partner delivering quality globally."}
        </Text>
        
        <View style={styles.coverContactBox}>
          <Text style={styles.coverContactText}>{settings.company_name}</Text>
          <Text style={styles.coverContactText}>{settings.primary_email}  |  {settings.primary_phone}</Text>
          <Text style={styles.coverContactText}>{settings.office_address?.replace(/\n/g, ', ')}</Text>
        </View>
      </Page>

      {/* Products Pages */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={getAbsoluteUrl('/mark.png')} style={{ width: 60 }} />
          <Text style={styles.headerCategory}>
            {categoryName ? categoryName : 'All Products'}
          </Text>
        </View>

        <View style={styles.productsGrid}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard} wrap={false}>
              {product.image && (
                <Image src={getAbsoluteUrl(product.image)} style={styles.productImage} />
              )}
              <Text style={styles.productTitle}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category?.name}</Text>
              <Text style={styles.productDesc}>
                {product.description?.length > 150 
                  ? `${product.description.substring(0, 150)}...` 
                  : product.description}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Generated dynamically by ${settings.company_name} | Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};
