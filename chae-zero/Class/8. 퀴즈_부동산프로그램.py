"""
# 퀴즈: 주어진 코드를 활용하여 부동산 프로그램을 작성하시오.

(출력 예제)

총 3대의 매물이 있습니다.
강남 아파트 매매 10억 2010년
마포 오피스텔 전세 5억 2007년
송파 빌라 월세 500/50 2000년

[코드]

class House:
    # 매물 초기화
    def __init__(self, location, house_type, deal_type, price, completion_year):
        pass
    
    # 매물 정보 표시
    def show_detail(self):
        pass

"""



# 풀이 1
class House:
    def __init__(self, location, house_type, deal_type, price, completion_year):
        self.location=location
        self.house_type=house_type
        self.deal_type=deal_type
        self.price=price
        self.completion_year=completion_year
    
    def show_detail(self):
        print(f"{self.location} {self.house_type} {self.deal_type} {self.price} {self.completion_year}")
        
building1 = House('강남', '아파트', '매매', '10억', '2010년')
building2 = House('마포', '오피스텔', '전세', '5억', '2007년')
building3 = House('송파', '빌라', '월세', '500/50', '2000년')
    

print("총 3대의 매물이 있습니다.")
building1.show_detail()
building2.show_detail()
building3.show_detail()




# 풀이 2 - 리스트, 포맷 활용
class House:
    def __init__(self, location, house_type, deal_type, price, completion_year):
        self.location=location
        self.house_type=house_type
        self.deal_type=deal_type
        self.price=price
        self.completion_year=completion_year
    
    def show_detail(self):
        print(self.location, self.house_type, self.deal_type, self.price, self.completion_year)

house = []

house1 = House('강남', '아파트', '매매', '10억', '2010년')
house2 = House('마포', '오피스텔', '전세', '5억', '2007년')
house3 = House('송파', '빌라', '월세', '500/50', '2000년')

house.append(house1)
house.append(house2)
house.append(house3)

len_house = len(house)

print(f"총 {len_house}대의 매물이 있습니다.")
house1.show_detail()
house2.show_detail()
house3.show_detail()




# 풀이 3 - for문 활용
class House:
    def __init__(self, location, house_type, deal_type, price, completion_year):
        self.location=location
        self.house_type=house_type
        self.deal_type=deal_type
        self.price=price
        self.completion_year=completion_year
    
    def show_detail(self):
        print(self.location, self.house_type, self.deal_type, self.price, self.completion_year)

houses = []

house1 = House('강남', '아파트', '매매', '10억', '2010년')
house2 = House('마포', '오피스텔', '전세', '5억', '2007년')
house3 = House('송파', '빌라', '월세', '500/50', '2000년')

houses.append(house1)
houses.append(house2)
houses.append(house3)

print(f"총 {len(houses)}대의 매물이 있습니다.")
for house in houses:
    house.show_detail()