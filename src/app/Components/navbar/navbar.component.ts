import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from "src/app/app-routing.module";
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  constructor(private route: Router, private prodService: ProductService) { }

  ngOnInit() {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.warn('in seller area');
          this.menuType = "seller";
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          // console.warn('outside seller area'); 
          this.menuType = 'default'
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.warn(element.value);
      if (element.value.trim().length > 0) {
        this.prodService.findProducts(element.value).subscribe(res => {
          console.warn(res);
          
        });
      }

    }
  }
}
