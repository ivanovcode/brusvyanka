## Requirements
- ansible
- ssh-agent

```
pip install ansible
```

```
eval `ssh-agent`
ssh-add
```


## Provision new server

- Edit file hosts
- Run playbook:

```
ansible-playbook conf.yml -v
```


## Updating
```
ansible-playbook deploy.yml -v
```
