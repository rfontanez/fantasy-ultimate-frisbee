

from audl.stats.endpoints.playerstats import PlayerStats

import pandas as pd

# creating a DataFrame
# players = {'Name' : ['Martha', 'Tim', 'Rob', 'Georgia'],
#         'Maths' : [87, 91, 97, 95],
#         'Science' : [83, 99, 84, 76]}


players = PlayerStats('2024', 'total', 'breeze').fetch_table()  # PlayerStats(season, per, team)

df = pd.DataFrame(players)
 
# displaying the DataFrame
# df.style

print(df)