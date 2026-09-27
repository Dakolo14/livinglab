import React from 'react';
import './Products.css';

interface ProductData {
  title: string;
  subtitle: string;
  image?: string;
  indication: string[];
  action: string[];
  usage: string[];
}

interface CategoryData {
  id: string;
  name: string;
  tagline?: string;
  audience: string[];
  products: ProductData[];
}

const productCategories: CategoryData[] = [
  {
    id: "sun-protection",
    name: "SUN PROTECTION",
    audience: [
      "For all skin types.",
      "Daily use.",
      "Adults, children"
    ],
    products: [
      {
        title: "ANTHELIOS UVMUNE400",
        subtitle: "INVISIBLE FLUID SPF50+",
        indication: [
          "For people looking for effective daily UV protection",
          "For all sensitive skin types"
        ],
        action: [
          "Protects from deep cellular damage",
          "Ultra-high protection: UVB, UVA and ultra-long UVA, the most insidious kind",
          "Does not sting eyes"
        ],
        usage: [
          "Apply generously before exposure",
          "Reapply frequently to maintain the level of protection"
        ]
      },
      {
        title: "ANTHELIOS INVISIBLE SPRAY",
        subtitle: "SPF50+",
        indication: [
          "Sensitive skin"
        ],
        action: [
          "Very high UVA/UVB protection"
        ],
        usage: [
          "Apply generously before exposure",
          "Reapply frequently to maintain protection"
        ]
      },
      {
        title: "ANTHELIOS INVISIBLE SPRAY",
        subtitle: "DERMO-PEDIATRICS SPF50+",
        indication: [
          "Sensitive skin",
          "Face and body for children"
        ],
        action: [
          "Very high UVA/UVB protection",
          "Water, sand and sweat-resistant",
          "Ultra-high protection: UVB, UVA and ultra-long UVA, the most insidious kind",
          "No white casts"
        ],
        usage: [
          "Apply generously before exposure",
          "Reapply frequently to maintain protection"
        ]
      }
    ]
  },
  {
    id: "mela-b3",
    name: "MELA B3",
    tagline: "HYPERPIGMENTATION",
    audience: [
      "Uneven skin tone and dark spots.",
      "Discover the efficacy of Melasyl™.",
      "Adults"
    ],
    products: [
      {
        title: "MELA B3 SERUM",
        subtitle: "INTENSIVE ANTI-DARK SPOTS SERUM\nANTI-RELAPSE EFFICACY",
        indication: [
          "Uneven skin tone and dark spots"
        ],
        action: [
          "Intercepts excess melanin at a different stage of its production before it marks the skin",
          "[ Melasyl™ ] NEW MULTI-PATENTED ACTIVE",
          "Anti-inflammatory [ 10% Niacinamide + K2G ]",
          "Exfoliates and activates cell renewal [ LHA + Retinyl Palmitate ]",
          "Antioxidant [ Carnosine ]"
        ],
        usage: [
          "Apply morning and evening to the face, neck and hands (if needed)",
          "In the daytime, use in combination with Anthelios Fluid SPF50+ sun protection, depending on your skin type"
        ]
      }
    ]
  }
];

const Products: React.FC = () => {
  return (
    <section className="products-section" id="products">
      <div className="products-container">
        


        {productCategories.map((category) => (
          <div key={category.id} className="category-block">
            
            <div className="category-sidebar">
              <div className="category-sidebar-sticky">
                {category.tagline && <div className="category-tagline">{category.tagline}</div>}
                <h3 className="category-name">{category.name}</h3>
                
                <div className="category-audience">
                  <h4>WHO IS IT FOR?</h4>
                  {category.audience.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="category-products">
              {category.products.map((product, idx) => (
                <div key={idx} className="product-card">
                  
                  <div className="product-packshot">
                    <div className="packshot-placeholder">
                      {/* Image placeholder */}
                      <span className="packshot-text">PACKSHOT<br/>{product.title}</span>
                    </div>
                  </div>
                  
                  <div className="product-details">
                    <h4 className="product-title">{product.title}</h4>
                    <p className="product-subtitle">{product.subtitle.split('\n').map((str, k) => <React.Fragment key={k}>{str}<br/></React.Fragment>)}</p>
                    
                    <div className="product-specs">
                      <div className="spec-block">
                        <h5 className="spec-title">INDICATION</h5>
                        <ul className="spec-list">
                          {product.indication.map((item, i) => (
                            <li key={i}><span className="bullet">{'>'}</span> {item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="spec-block">
                        <h5 className="spec-title">ACTION</h5>
                        <ul className="spec-list">
                          {product.action.map((item, i) => (
                            <li key={i}><span className="bullet">{'>'}</span> {item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="spec-block">
                        <h5 className="spec-title">USAGE</h5>
                        <ul className="spec-list">
                          {product.usage.map((item, i) => (
                            <li key={i}><span className="bullet">{'>'}</span> {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
