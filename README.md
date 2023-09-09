# Мини игра Blast


Игра состоит из игрового поля произвольного размера 9*9. В каждой ячейке поля находится игровой объект (далее именуемый тайл) определенного цвета. Количество возможных вариантов цветов равно 5. 
Начальное состояние поля задается случайно (вероятность цвета тайла является равновероятной). При клике на тайл сжигается (удаляется) область, состоящая из группы прилегающих тайлов того же цвета, размер группы не может быть меньше чем K (по умолчанию K=5, настраивается в конфиге). На месте удаленных должны образоваться пустые места.
Далее происходит перемещение тайлов на пустые места сверху вниз. Если верхняя ячейка становится пустой - генерируется новый тайл и перемещается в эту ячейку . Процесс перемещения и добавления новых тайлов непрерывный и происходит до тех пор, пока поле снова не будет полностью заполнено.
На заполненном поле всегда можно сжечь тайлы. Если такой возможности нет, то происходит перемешивание тайлов на поле (количество перемешиваний видно вверху, настраивается в конфиге ). Если же после перемешивания нет возможности сжечь тайлы, то такая ситуация является проигрышем для игрока.
	Игра собрана для демонстрации, финальной цели не выставлено, игра идет допроигрыша игрока.
    Либо закончатся ходы, либо кол-во перемешиваний достигнет нуля.
    Также есть бонус обьект Бустер бомба. Активируется по нажатию на показатель остатка. Для дополнительного информирования игрока что бомба задействована на момент активации курсор меняется на перекрестие. При нажатии на тайл бомба уничтожает все в радиусе 1 тайла. Получается квадрат в 9 тайлов.

