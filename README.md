## Giới thiệu
* Học viết **REST Api** bằng Node
### Work Flow
* routes > nhận request từ browser
* controllers > nơi tiếp nhận các request
* models > cấu trúc model để tương tác database
* services > tất cả cá business login này ở đây
![SOA structure](/img/SOA.jpeg)

### Error Handling
Có hai loại error trong Node js
##### Operational errors
- Xảy ra trong quá trình ứng dụng hoạt động, nguyên nhân thường là do các đầu vào không bình thường 
- Không cần khởi động lại ứng dụng

##### Programmer errors
- Nguyên nhân thường đến từ chất lượng của code không tốt
- cần khởi động lại ứng dụng
