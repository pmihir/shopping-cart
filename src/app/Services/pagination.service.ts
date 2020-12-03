import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 8) {
    let totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage < 1) {
      currentPage = 1;
    }
    else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number = 1, endPage: number = totalPages;

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = startIndex + pageSize - 1;
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
