- *ollama run <model_of_choice>
  - Safe
    - phi 
    - phi3 
    - gemma:2b 
    - tinyllama
  - Medium (:these will run but slower responses higher memory pressure)
    - mistral ->slower but higher quality
    - llama3:8b
- pulling an image then running the below commands if needed 
  - ollama pull phi3
- example:
  - ollama run phi3
  - ollama run gemma:2b 
  - ollama run mistral

phi3 -> fast everyday use -> alias="ollama run phi" <- 
phi3 -> better reasoning -> alias="ollama run phi3" <- 
mistral -> higher quality -> alias="ollama run mistral" <- 


- If model keeps erroring out 
  - ollama rm <model_name>
    - *ollama rm phi3
